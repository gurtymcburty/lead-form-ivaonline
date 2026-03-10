import { chromium, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface FormData {
  url: string;
  name: string;
  steps: Array<{
    stepNumber: number;
    screenshot: string;
    questionText: string;
    questionType: string;
    options?: string[];
    placeholder?: string;
    buttonText: string;
    styling: {
      backgroundColor: string;
      textColor: string;
      buttonColor: string;
      fontFamily: string;
    };
  }>;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeTypeform(page: Page, url: string, name: string, referenceDir: string): Promise<FormData> {
  console.log(`\n=== Scraping ${name}: ${url} ===\n`);

  const formData: FormData = {
    url,
    name,
    steps: []
  };

  await page.goto(url, { waitUntil: 'networkidle' });
  await delay(2000);

  // Take initial screenshot
  await page.screenshot({ path: path.join(referenceDir, `${name}-landing.png`), fullPage: true });
  console.log(`Captured: ${name}-landing.png`);

  // Get page styling
  const getStyles = async () => {
    return await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      return {
        backgroundColor: computedStyle.backgroundColor,
        textColor: computedStyle.color,
        fontFamily: computedStyle.fontFamily,
      };
    });
  };

  let stepNumber = 0;
  let continueLoop = true;

  while (continueLoop && stepNumber < 15) {
    stepNumber++;
    await delay(1500);

    // Capture current state
    const screenshotPath = path.join(referenceDir, `${name}-step-${stepNumber}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Captured: ${name}-step-${stepNumber}.png`);

    // Extract question data
    const stepData = await page.evaluate(() => {
      // Try to find question text
      const questionSelectors = [
        '[data-qa="question-title"]',
        '[class*="QuestionTitle"]',
        'h1',
        '[role="heading"]',
        '.question-title',
        '[data-testid="question-title"]'
      ];

      let questionText = '';
      for (const selector of questionSelectors) {
        const el = document.querySelector(selector);
        if (el && el.textContent) {
          questionText = el.textContent.trim();
          break;
        }
      }

      // Find options for multiple choice
      const options: string[] = [];
      const choiceSelectors = [
        '[data-qa="choice"]',
        '[class*="Choice"]',
        '[role="option"]',
        'button[data-qa]',
        '[class*="choice"]'
      ];

      for (const selector of choiceSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          elements.forEach(el => {
            if (el.textContent) {
              options.push(el.textContent.trim());
            }
          });
          break;
        }
      }

      // Find input placeholder
      const input = document.querySelector('input:not([type="hidden"])');
      const placeholder = input ? input.getAttribute('placeholder') || '' : '';

      // Find button text
      const buttonSelectors = [
        '[data-qa="ok-button"]',
        '[data-qa="submit-button"]',
        'button[type="submit"]',
        '[class*="Button"]',
        'button'
      ];

      let buttonText = 'OK';
      for (const selector of buttonSelectors) {
        const btn = document.querySelector(selector);
        if (btn && btn.textContent && btn.textContent.trim().length > 0) {
          buttonText = btn.textContent.trim();
          break;
        }
      }

      // Determine question type
      let questionType = 'unknown';
      if (options.length > 0) {
        questionType = 'multiple-choice';
      } else if (document.querySelector('input[type="email"]')) {
        questionType = 'email';
      } else if (document.querySelector('input[type="tel"]')) {
        questionType = 'phone';
      } else if (document.querySelector('input[type="text"]')) {
        questionType = 'text';
      } else if (document.querySelector('input[type="number"]')) {
        questionType = 'number';
      }

      // Get button color
      const button = document.querySelector('button');
      const buttonColor = button ? window.getComputedStyle(button).backgroundColor : 'rgb(0, 0, 0)';

      return {
        questionText,
        questionType,
        options,
        placeholder,
        buttonText,
        buttonColor
      };
    });

    const styles = await getStyles();

    formData.steps.push({
      stepNumber,
      screenshot: `${name}-step-${stepNumber}.png`,
      questionText: stepData.questionText,
      questionType: stepData.questionType,
      options: stepData.options.length > 0 ? stepData.options : undefined,
      placeholder: stepData.placeholder || undefined,
      buttonText: stepData.buttonText,
      styling: {
        backgroundColor: styles.backgroundColor,
        textColor: styles.textColor,
        buttonColor: stepData.buttonColor,
        fontFamily: styles.fontFamily,
      }
    });

    console.log(`Step ${stepNumber}: "${stepData.questionText}" (${stepData.questionType})`);
    if (stepData.options.length > 0) {
      console.log(`  Options: ${stepData.options.join(', ')}`);
    }

    // Try to proceed to next step
    try {
      // For multiple choice, click first option
      if (stepData.options.length > 0) {
        const clicked = await page.evaluate(() => {
          const choices = document.querySelectorAll('[data-qa="choice"], [role="option"], [class*="Choice"], button[class*="choice"]');
          if (choices.length > 0) {
            (choices[0] as HTMLElement).click();
            return true;
          }
          return false;
        });

        if (clicked) {
          await delay(500);
        }
      }

      // For text inputs, fill in sample data
      const inputType = stepData.questionType;
      if (inputType === 'text') {
        const input = await page.$('input[type="text"]');
        if (input) {
          await input.fill('John');
          await delay(300);
        }
      } else if (inputType === 'email') {
        const input = await page.$('input[type="email"]');
        if (input) {
          await input.fill('test@example.com');
          await delay(300);
        }
      } else if (inputType === 'phone') {
        const input = await page.$('input[type="tel"]');
        if (input) {
          await input.fill('07700900000');
          await delay(300);
        }
      } else if (inputType === 'number') {
        const input = await page.$('input[type="number"]');
        if (input) {
          await input.fill('10000');
          await delay(300);
        }
      }

      // Look for and click the OK/submit button
      const buttonClicked = await page.evaluate(() => {
        const buttonSelectors = [
          '[data-qa="ok-button"]',
          '[data-qa="submit-button"]',
          'button[type="submit"]',
          '[class*="SubmitButton"]'
        ];

        for (const selector of buttonSelectors) {
          const btn = document.querySelector(selector) as HTMLElement;
          if (btn) {
            btn.click();
            return true;
          }
        }
        return false;
      });

      if (!buttonClicked) {
        // Try pressing Enter
        await page.keyboard.press('Enter');
      }

      await delay(2000);

      // Check if we reached a thank you page or the form ended
      const isEnded = await page.evaluate(() => {
        const thankYouSelectors = [
          '[data-qa="thank-you"]',
          '[class*="ThankYou"]',
          '[class*="ending"]'
        ];

        for (const selector of thankYouSelectors) {
          if (document.querySelector(selector)) {
            return true;
          }
        }

        // Check if text contains thank you
        const bodyText = document.body.innerText.toLowerCase();
        return bodyText.includes('thank you') || bodyText.includes('thanks') || bodyText.includes("we'll be in touch");
      });

      if (isEnded) {
        // Capture final thank you screen
        await page.screenshot({ path: path.join(referenceDir, `${name}-thankyou.png`), fullPage: true });
        console.log(`Captured: ${name}-thankyou.png`);
        continueLoop = false;
      }

    } catch (error) {
      console.log(`Navigation ended at step ${stepNumber}`);
      continueLoop = false;
    }
  }

  return formData;
}

async function main() {
  const referenceDir = path.join(__dirname, '..', 'reference');

  // Ensure reference directory exists
  if (!fs.existsSync(referenceDir)) {
    fs.mkdirSync(referenceDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  const results: FormData[] = [];

  // Scrape first form
  try {
    const form1 = await scrapeTypeform(page, 'https://upsave.typeform.com/to/qS2Nsw', 'form1', referenceDir);
    results.push(form1);
  } catch (error) {
    console.error('Error scraping form 1:', error);
  }

  // Scrape second form
  try {
    const form2 = await scrapeTypeform(page, 'https://upsave.typeform.com/to/fCaQzF', 'form2', referenceDir);
    results.push(form2);
  } catch (error) {
    console.error('Error scraping form 2:', error);
  }

  await browser.close();

  // Save form data as JSON
  fs.writeFileSync(
    path.join(referenceDir, 'form-data.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n=== Scraping Complete ===');
  console.log(`Screenshots saved to: ${referenceDir}`);
  console.log(`Form data saved to: ${path.join(referenceDir, 'form-data.json')}`);
}

main().catch(console.error);
