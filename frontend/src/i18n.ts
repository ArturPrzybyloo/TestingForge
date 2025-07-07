import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'Home': 'Home',
      'Challenges': 'Challenges',
      'Playground': 'Playground',
      'Learn': 'Learn',
      'Community': 'Community',
      'Dashboard': 'Dashboard',
      'Logout': 'Logout',
      'Login': 'Login',
      'Sign Up': 'Sign Up',
      
      // Main page - Hero Section
      'Testing Community': 'Testing Community',
      'home.hero.title': 'Master Software Testing Skills',
      'home.hero.description': 'Level up your testing expertise with interactive challenges, real-world scenarios, and hands-on practice.',
      
      // Why Choose Section
      'home.whyChoose.title': 'Why Choose Testing Forge?',
      'home.whyChoose.realWorld.title': 'Real-World Challenges',
      'home.whyChoose.realWorld.description': 'Practice with scenarios that mirror actual testing situations from the industry.',
      'home.whyChoose.handson.title': 'Hands-On Learning',
      'home.whyChoose.handson.description': 'Learn by doing with interactive challenges and practical exercises.',
      'home.whyChoose.community.title': 'Active Community',
      'home.whyChoose.community.description': 'Connect with other testers and share your experiences.',
      'home.whyChoose.current.title': 'Stay Current',
      'home.whyChoose.current.description': 'Learn the latest testing techniques and industry best practices.',
      'Start Learning →': 'Start Learning →',
      'Login to Browse Challenges': 'Login to Browse Challenges',
      'Login to Try Challenges': 'Login to Try Challenges',
      
      // Homepage registration benefits
      'home.hero.subtitle': 'Join thousands of testers mastering their skills with our interactive platform.',
      'home.benefits.title': 'What You Get After Registration',
      'home.benefits.subtitle': 'Unlock your full potential with exclusive features available only to registered members.',
      'home.benefits.challenges.title': '18+ Interactive Challenges',
      'home.benefits.challenges.description': 'Access our complete library of hands-on testing challenges covering UI, API, Browser DevTools, and more.',
      'home.benefits.learning.title': 'Comprehensive Learning Paths',
      'home.benefits.learning.description': 'Follow structured courses from beginner to advanced levels with DevTools mastery and AI-powered QA techniques.',
      'home.benefits.playground.title': 'Automation Playground',
      'home.benefits.playground.description': 'Practice test automation with real scenarios - forms, drag & drop, file uploads, and browser interactions.',
      'home.benefits.progress.title': 'Track Your Progress',
      'home.benefits.progress.description': 'Monitor your learning journey with detailed dashboards, points system, and achievement tracking.',
      'home.benefits.community.title': 'Join the Community',
      'home.benefits.community.description': 'Connect with fellow testers, share experiences, and get help from our supportive community.',
      'home.benefits.certificates.title': 'Earn Certificates',
      'home.benefits.certificates.description': 'Get recognized for your achievements with completion certificates and skill badges.',
      'home.cta.title': 'Ready to Level Up Your Testing Skills?',
      'home.cta.subtitle': 'Join our community of professional testers and start your journey today.',
      'home.cta.register': 'Create Free Account',
      'home.cta.login': 'Already have an account? Sign In',
      
      // Sample Challenge Section
      'home.sampleChallenge.title': 'Try a Sample Challenge',
      'home.sampleChallenge.apiTitle': 'API Testing Challenge',
      'home.sampleChallenge.description': 'Test a REST API endpoint that manages user profiles. Your task is to:',
      'home.sampleChallenge.task1': 'Verify the GET /users endpoint returns correct user data',
      'home.sampleChallenge.task2': 'Test POST /users with invalid data handling',
      'home.sampleChallenge.task3': 'Implement proper error handling',
      'home.sampleChallenge.try': 'Try This Challenge',
      
      // Audience Section
      'home.audience.title': 'Who is this for?',
      'home.audience.beginner.title': 'Beginner Testers',
      'home.audience.beginner.description': 'Start your testing journey with fundamental concepts and basic challenges.',
      'home.audience.midLevel.title': 'Mid-Level Testers',
      'home.audience.midLevel.description': 'Enhance your skills with advanced scenarios and automation challenges.',
      'home.audience.senior.title': 'Senior Testers',
      'home.audience.senior.description': 'Lead testing initiatives and prepare for future AI-enhanced testing workflows.',
      
      // Technologies Section
      'home.technologies.title': 'Technologies Covered',
      'home.technologies.selenium': 'Selenium',
      'home.technologies.playwright': 'Playwright',
      'home.technologies.postman': 'Postman',
      'home.technologies.devtools': 'DevTools',
      
      // Future Roadmap Section
      'home.roadmap.title': 'Future Learning Path',
      'home.roadmap.description': 'We\'re building something special for the QA community. Once we have a solid user base, we\'ll launch an exclusive course.',
      'home.roadmap.aiCourse.title': 'Coming Soon: AI Agents for QA',
      'home.roadmap.aiCourse.description': 'Learn how to build and implement AI testing agents to revolutionize your QA workflows. This advanced course will be available to our community members.',
      'home.roadmap.aiCourse.note': 'This course will be launched after we build a strong community of testers.',
      
      // Testimonials Section
      'home.testimonials.title': 'What Our Users Say',
      'home.testimonials.sarah': 'The interactive challenges helped me improve my testing skills significantly. Highly recommended!',
      'home.testimonials.michael': 'Best platform for learning modern testing techniques. The community is incredibly supportive.',
      'home.testimonials.david': 'The real-world scenarios are exactly what I needed to prepare for my testing career.',
      
      // Playground
      'playground.title': 'Automation Playground',
      'playground.description': 'Welcome to the Automation Playground! This is your dedicated space for practicing web automation. Each module provides a controlled environment to practice different automation scenarios using tools like Selenium, Playwright, or Cypress. No flags or challenges - just pure automation practice!',
      'playground.tips': 'Tips',
      
      // Playground modules
      'playground.module.dynamicUI.label': 'Dynamic UI',
      'playground.module.dynamicUI.title': 'Dynamic UI Elements',
      'playground.module.dynamicUI.description': 'Practice automating interactions with elements that appear and disappear dynamically. Perfect for learning wait strategies and element detection.',
      'playground.module.dynamicUI.tips': 'Use explicit waits to handle the element\'s visibility. Consider using polling strategies for better reliability. Handle potential StaleElementReferenceException.',
      'playground.module.dynamicUI.simulation': 'This module simulates a button that appears and disappears every 5 seconds. Practice waiting for and interacting with dynamic elements.',
      'playground.module.dynamicUI.button': 'Click Me!',
      
      'playground.module.ajax.label': 'AJAX Requests',
      'playground.module.ajax.title': 'AJAX Requests',
      'playground.module.ajax.description': 'Train your automation skills with asynchronous data loading. Learn how to handle loading states and wait for dynamic content.',
      'playground.module.ajax.tips': 'Wait for loading spinner to disappear. Use explicit waits for the data to appear. Consider using custom wait conditions.',
      'playground.module.ajax.simulation': 'This module simulates asynchronous data loading with a loading spinner. Practice handling dynamic content and loading states.',
      'playground.module.ajax.loading': 'Loading data...',
      'playground.module.ajax.loadData': 'Load Data',
      
      'playground.module.form.label': 'Form Validation',
      'playground.module.form.title': 'Form Validation',
      'playground.module.form.description': 'Practice automating form interactions with real-time validation. Learn how to handle input validation and form submission.',
      'playground.module.form.tips': 'Validate all fields before submitting. Handle error messages and edge cases. Test both valid and invalid inputs.',
      'playground.module.form.simulation': 'This module provides a form with real-time validation. Practice form automation with various input types and validation rules.',
      'playground.module.form.name': 'Name',
      'playground.module.form.email': 'Email',
      'playground.module.form.phone': 'Phone Number',
      'playground.module.form.submit': 'Submit',
      'playground.module.form.errorName': 'Name is required',
      'playground.module.form.errorEmail': 'Invalid email format',
      'playground.module.form.errorPhone': 'Phone must be at least 9 digits',
      'playground.module.form.success': 'Form submitted successfully!',
      
      'playground.module.iframe.label': 'iFrame & Modals',
      'playground.module.iframe.title': 'iFrame & Modals',
      'playground.module.iframe.description': 'Practice automating iframe and modal interactions. Learn context switching and nested element handling.',
      'playground.module.iframe.tips': 'Switch to iframe context before interacting with elements. Use proper waiting strategies for modal appearance. Test both iframe and modal closing.',
      'playground.module.iframe.simulation': 'This module demonstrates iframe and modal interactions. Practice switching contexts and handling nested elements.',
      'playground.module.iframe.openModal': 'Open Modal',
      'playground.module.iframe.modalTitle': 'Modal Content',
      'playground.module.iframe.button': 'Hidden Button',
      'playground.module.iframe.openIframe': 'Open iFrame',
      
      'playground.module.table.label': 'Tables & Lists',
      'playground.module.table.title': 'Tables & Lists',
      'playground.module.table.description': 'Practice automating table interactions including sorting and data selection. Learn how to work with dynamic table data.',
      'playground.module.table.tips': 'Sort tables before selecting data. Verify table contents after actions. Handle dynamic row and column changes.',
      'playground.module.table.simulation': 'This module simulates a product table with sorting and filtering capabilities. Practice automating table interactions and data verification.',
      'playground.module.table.product': 'Product',
      'playground.module.table.price': 'Price',
      'playground.module.table.product1': 'Premium Plan',
      'playground.module.table.product2': 'Basic Plan',
      'playground.module.table.product3': 'Standard Plan',
      'playground.module.table.product4': 'Enterprise Plan',
      
      'playground.module.select.label': 'Select Dropdown',
      'playground.module.select.title': 'Select Dropdown',
      'playground.module.select.description': 'Practice automating selection from dropdown menus. Learn how to interact with <select> elements and verify selected values.',
      'playground.module.select.tips': 'Use selectByValue or selectByVisibleText in your automation tool. Verify the selected value after interaction. Handle dynamic dropdowns and disabled options.',
      'playground.module.select.simulation': 'This module simulates a dropdown menu with various options. Practice selecting different values and verifying the selection.',
      'playground.module.select.choose': 'Choose an option:',
      'playground.module.select.select': 'Select a value',
      'playground.module.select.apple': 'Apple',
      'playground.module.select.banana': 'Banana',
      'playground.module.select.cherry': 'Cherry',
      'playground.module.select.grape': 'Grape',
      'playground.module.select.selected': 'Selected: {value}',
      
      'playground.module.choices.label': 'Checkboxes & Radios',
      'playground.module.choices.title': 'Checkboxes & Radio Buttons',
      'playground.module.choices.description': 'Practice automating selection of checkboxes and radio buttons. Learn how to check, uncheck, and verify options.',
      'playground.module.choices.tips': 'Use click or check actions for checkboxes/radios. Verify checked state after interaction. Test keyboard accessibility (Tab, Space, Arrow keys).',
      'playground.module.choices.simulation': 'This module provides checkboxes and radio buttons for practice. Learn to handle multiple selections and verify states.',
      'playground.module.choices.subscribe': 'Subscribe',
      'playground.module.choices.newsletter': 'Newsletter',
      'playground.module.choices.updates': 'Product Updates',
      'playground.module.choices.choosePlan': 'Choose Your Plan',
      'playground.module.choices.basic': 'Basic',
      'playground.module.choices.pro': 'Professional',
      
      // New modules
      'playground.module.dragDrop.label': 'Drag & Drop',
      'playground.module.dragDrop.title': 'Drag & Drop Automation',
      'playground.module.dragDrop.description': 'Practice automating drag & drop operations with interactive Kanban board. Learn drag event handling and element position verification.',
      'playground.module.dragDrop.tips': 'Use data-testid attributes to identify drag sources and drop targets. Test drag and drop using framework-specific methods (e.g., page.dragAndDrop() in Playwright). Verify that items appear in correct containers after drop. Check that item counts in each column are updated. Test edge cases like dropping on the same container.',
      'playground.module.dragDrop.todo': 'To Do',
      'playground.module.dragDrop.inProgress': 'In Progress',
      'playground.module.dragDrop.done': 'Done',
      'playground.module.dragDrop.automationTips': 'Automation Tips',
      
      'playground.module.fileUpload.label': 'File Upload',
      'playground.module.fileUpload.title': 'File Upload & Download Testing',
      'playground.module.fileUpload.description': 'Practice automating file upload and download operations. Learn file input handling and upload success verification.',
      'playground.module.fileUpload.tips': 'Use input[type="file"] selectors and .setInputFiles() method. Verify file appears in upload area after selection. Check upload progress indicators and success messages. Test download functionality by clicking download links. Validate file type restrictions and size limits.',
      'playground.module.fileUpload.area': 'File Upload Area',
      'playground.module.fileUpload.uploading': 'Uploading file...',
      'playground.module.fileUpload.success': 'Upload Successful!',
      'playground.module.fileUpload.file': 'File',
      'playground.module.fileUpload.size': 'Size',
      'playground.module.fileUpload.download': 'Download File',
      
      'playground.module.alerts.label': 'Browser Alerts',
      'playground.module.alerts.title': 'Handling Browser Alerts & Confirm Dialogs',
      'playground.module.alerts.description': 'Practice handling JavaScript alerts, confirms, and prompts. Learn to accept, dismiss, and interact with browser dialogs.',
      'playground.module.alerts.tips': 'Use page.on("dialog") to handle alerts before they appear. Accept dialogs with dialog.accept() or dismiss with dialog.dismiss(). For prompts, use dialog.accept(text) to enter text. Test both accepting and dismissing dialogs. Verify page state changes after dialog interactions.',
      'playground.module.alerts.practice': 'Practice automating browser dialog handling (alert, confirm, prompt)',
      'playground.module.alerts.showAlert': 'Show Alert',
      'playground.module.alerts.showConfirm': 'Show Confirm',
      'playground.module.alerts.showPrompt': 'Show Prompt',
      'playground.module.alerts.lastAction': 'Last Action Result:',
      
      'playground.module.localization.label': 'Localization',
      'playground.module.localization.title': 'Localization & Language Switching',
      'playground.module.localization.description': 'Practice testing multi-language applications and localization features. Learn to verify text changes and layout adaptations.',
      'playground.module.localization.tips': 'Test language switching by clicking language selectors. Verify text changes in multiple UI elements after language switch. Check that page layouts adapt to different text lengths. Test RTL (right-to-left) languages if supported. Validate that form labels, error messages, and tooltips are translated.',
      'playground.module.localization.welcome': 'Welcome to Testing Forge!',
      'playground.module.localization.description_text': 'This is a platform for learning test automation.',
      'playground.module.localization.start_learning': 'Start Learning',
      'playground.module.localization.help': 'Help',
      'playground.module.localization.current_language': 'Current language: English',
      'playground.module.localization.tips.1': 'Test language switching by clicking language selectors',
      'playground.module.localization.tips.2': 'Verify text changes in multiple UI elements after language switch',
      'playground.module.localization.tips.3': 'Check that page layouts adapt to different text lengths',
      'playground.module.localization.tips.4': 'Test RTL (right-to-left) languages if supported',
      'playground.module.localization.tips.5': 'Validate that form labels, error messages, and tooltips are translated',
      
      // Challenge translations EN
      'challenge.secretMessage.title': 'Secret Message',
      'challenge.secretMessage.description': 'Encode a message to base64 (common web encoding).',
      'challenge.secretMessage.category': 'Logic',
      'challenge.orderMatters.title': 'Order Matters!',
      'challenge.orderMatters.description': 'Arrange test cases in the correct order (drag & drop).',
      'challenge.orderMatters.category': 'UI',
      'challenge.uiBugHunt.title': 'UI Bug Hunt',
      'challenge.uiBugHunt.description': 'Find and click the hidden (real) submit button in a broken form.',
      'challenge.uiBugHunt.category': 'UI',
      'challenge.hiddenParameter.title': 'Hidden Parameter',
      'challenge.hiddenParameter.description': 'Add the correct parameter to the URL to reveal the flag.',
      'challenge.hiddenParameter.category': 'Web',
      'challenge.cookieInspector.title': 'Cookie Inspector',
      'challenge.cookieInspector.description': 'Find the flag hidden in your browser cookies.',
      'challenge.cookieInspector.category': 'Browser',
      'challenge.jsonExplorer.title': 'JSON Explorer',
      'challenge.jsonExplorer.description': 'Find the flag in the JSON response on the page.',
      'challenge.jsonExplorer.category': 'API',
      'challenge.xhrDetective.title': 'XHR Detective',
      'challenge.xhrDetective.description': 'Inspect the API request and find the Authorization token in the request headers.',
      'challenge.xhrDetective.category': 'API',
      'challenge.cssDebugger.title': 'CSS Debugger',
      'challenge.cssDebugger.description': 'Find and fix the CSS style that blocks button interaction using DevTools.',
      'challenge.cssDebugger.category': 'UI',
      'challenge.cookieHacker.title': 'Cookie Hacker',
      'challenge.cookieHacker.description': 'Set the correct cookie in DevTools to unlock the admin panel and reveal the flag.',
      'challenge.cookieHacker.category': 'Browser',
      'challenge.localStorageInspector.title': 'LocalStorage Inspector',
      'challenge.localStorageInspector.description': 'Edit LocalStorage to enable premium access and reveal the flag after refresh.',
      'challenge.localStorageInspector.category': 'Web',
      'challenge.brokenDom.title': 'Broken DOM',
      'challenge.brokenDom.description': 'Fix the broken registration form in the DOM to make it functional and submit for the flag.',
      'challenge.brokenDom.category': 'UI',
      'challenge.jsonValidator.title': 'JSON Validator',
      'challenge.jsonValidator.description': 'Practice validating JSON responses manually',
      'challenge.jsonValidator.category': 'API',
      'challenge.elementHighlighter.title': 'Element Highlighter',
      'challenge.elementHighlighter.description': 'In DevTools, open the Elements panel, find the <h1 id="main-title"> and add style outline: 3px solid red;. The flag is in the data-flag attribute of this element.',
      'challenge.elementHighlighter.category': 'UI',
      'challenge.networkTiming.title': 'Network Timing',
      'challenge.networkTiming.description': 'In the Network tab, refresh the page. Click the first request (e.g., /api/config). In the Headers tab, in response headers, find X-Flag-Code with the flag value.',
      'challenge.networkTiming.category': 'API',
      'challenge.formInputFuzzer.title': 'Form Input Fuzzer',
      'challenge.formInputFuzzer.description': 'On the registration page, fill all fields with an extremely long string (e.g., 200 random characters). After clicking "Submit", in the JSON response (Network → Preview) you will find the flag field.',
      'challenge.formInputFuzzer.category': 'Web',
      'challenge.raceConditionTester.title': 'Order API Flag Challenge',
      'challenge.raceConditionTester.description': 'Edit the JSON below and add "flag": true as a property. Then send a POST request. If the server receives flag: true, it will return the flag in the response. Find the flag in the response and enter it below.',
      'challenge.raceConditionTester.category': 'API',
      'challenge.domMutationObserver.title': 'DOM Mutation Observer',
      'challenge.domMutationObserver.description': 'On the product list, click "Load more". In the console, run the provided MutationObserver code. Then click "Load more" again – the flag will appear in the console.',
      'challenge.domMutationObserver.category': 'UI',
      'challenge.accessibilityAudit.title': 'Accessibility Audit',
      'challenge.accessibilityAudit.description': 'Use TAB to navigate through the interactive elements below. One of them cannot be focused using TAB (it is broken for keyboard users). Enter the id of the broken element to unlock the flag field.',
      'challenge.accessibilityAudit.category': 'Web',
      
      // SQL Challenges
      'SQL Orders Total Challenge': 'SQL Orders Total Challenge',
      'Calculate the total amount of orders for a specific customer using SQL SUM function.': 'Calculate the total amount of orders for a specific customer using SQL SUM function.',
      'SQL Login Frequency Challenge': 'SQL Login Frequency Challenge',
      'Find the user with the most frequent logins in the last 30 days using SQL GROUP BY and COUNT.': 'Find the user with the most frequent logins in the last 30 days using SQL GROUP BY and COUNT.',
      
      // Hard Challenges
      'Encoded Token Challenge': 'Encoded Token Challenge',
      'JWT token with exposed secret key in source code. Create a valid token with premium_user role to access the flag.': 'JWT token with exposed secret key in source code. Create a valid token with premium_user role to access the flag.',
      'CSS Puzzle Challenge': 'CSS Puzzle Challenge',
      'Flag hidden using advanced CSS techniques. Write CSS code to make the hidden flag visible.': 'Flag hidden using advanced CSS techniques. Write CSS code to make the hidden flag visible.',
      
      // Categories
      'sql': 'SQL',
      'cryptography': 'Cryptography',
      'css': 'CSS',
      'logs': 'Logs',
      // Learn translations EN
      'learn.courses.title': 'Courses',
      'learn.courses.description': 'Comprehensive, multi-week programs for deep learning. Paid access.',
      'learn.minicourses.title': 'Mini Courses',
      'learn.minicourses.description': 'Free, quick lessons to boost your QA skills.',
      'learn.course.aiqa.title': 'AI for QA Automation',
      'learn.course.aiqa.description': 'Master AI-powered automation in QA. 3-week intensive program.',
      'learn.course.aiqa.level': 'Advanced',
      'learn.course.aiqa.duration': '3 weeks',
      'learn.course.aiqa.cta': 'See details',
      'learn.minicourse.devtools.title': 'DevTools Mini Course',
      'learn.minicourse.devtools.description': 'Quick, practical DevTools lessons for QA testing. Learn essential browser debugging skills.',
      'learn.minicourse.devtools.duration': '1 hour total',
      'learn.minicourse.devtools.cta': 'Start now',
      'learn.comingSoon': 'Coming soon',
      'learn.moduleNotFound': 'Module not found',
      'learn.backToCourses': '← Back to courses',
      
      // DevTools Course modules
      'learn.course.introduction.title': 'DevTools Basics',
      'learn.course.introduction.description': 'Quick introduction to browser DevTools - your essential testing toolkit.',
      'learn.course.introduction.content': '🔧 DevTools Basics - Your Testing Toolkit\n\nBrowser DevTools are your most important testing tools. Every QA should master them.\n\n📋 What are DevTools?\n• Built into every modern browser\n• Essential for debugging and testing\n• Free and always available\n• No installation required\n\n🚀 How to open DevTools:\n• Press F12 (Windows/Linux)\n• Cmd+Option+I (Mac)\n• Right-click → Inspect\n• Ctrl+Shift+I (Windows/Linux)\n\n🎯 Main panels you\'ll use:\n• Elements - HTML/CSS inspection\n• Console - JavaScript debugging\n• Network - API calls and requests\n• Sources - debugging with breakpoints\n• Application - storage and PWA\n• Performance - performance analysis\n• Lighthouse - quality audits\n\n✨ Quick success:\nTry now - right-click on any element on this page and select "Inspect". You\'ll see the HTML and CSS of that element!\n\n💡 Pro tip:\nKeep DevTools open while testing - you\'ll catch errors faster and understand how websites work.',
      
      'learn.course.elements.title': 'Elements Panel',
      'learn.course.elements.description': 'Master HTML/CSS inspection and live editing in minutes.',
      'learn.course.elements.content': '🎨 Elements Panel - HTML/CSS Inspector\n\nThe Elements panel allows you to inspect and edit HTML and CSS of any page in real-time.\n\n🔍 What you can do:\n• Browse the HTML structure of pages\n• Edit CSS styles live\n• Test responsive designs\n• Debug layout issues\n• Find broken elements\n\n🛠️ Essential skills:\n\n1. **Selecting elements**\n   • Click the selector icon (top-left)\n   • Hover over page elements\n   • Click to inspect specific elements\n   • Use Ctrl+Shift+C shortcut\n\n2. **Live CSS editing**\n   • Click any CSS property to edit\n   • Add new styles by clicking empty space\n   • Toggle styles with checkboxes\n   • See changes instantly on page\n\n3. **Common testing tasks**\n   • Change button colors to test visibility\n   • Hide elements to test mobile layout\n   • Edit text to test different lengths\n   • Test hover states with :hov button\n\n⚡ Quick exercise:\n1. Open any webpage\n2. Press F12 to open DevTools\n3. Click the selector tool\n4. Click a button or link\n5. In Styles panel, change background-color\n6. See how change happens instantly!\n\n💡 Pro tip for testers:\nUse Elements panel to test UI edge cases - long text, missing images, different screen sizes. It\'s faster than changing real code!',
      
      'learn.course.console.title': 'Console Panel',
      'learn.course.console.description': 'Debug JavaScript and test code snippets like a professional.',
      'learn.course.console.content': '💻 Console Panel - JavaScript Testing Center\n\nThe Console is your JavaScript playground and debugging center.\n\n🎯 What you can do:\n• Execute JavaScript code instantly\n• Debug errors and issues\n• Test API calls\n• Check variables\n• Monitor app behavior\n\n🔧 Essential Console commands:\n\n1. **Basic testing**\n   • console.log("Hello") - Print messages\n   • console.error("Problem") - Show errors\n   • console.warn("Warning") - Show warnings\n   • console.table(data) - Display data as table\n\n2. **Quick DOM testing**\n   • document.querySelector("button") - Find elements\n   • $0 - Currently selected element\n   • $$("div") - Find all div elements\n   • inspect(element) - Go to Elements panel\n\n3. **Form testing**\n   • document.forms[0] - Get first form\n   • form.checkValidity() - Check form validation\n   • input.value = "test" - Set input values\n   • form.submit() - Submit forms\n\n⚡ Practical exercise:\n1. Open a page with forms\n2. Press F12 → Console tab\n3. Type: document.querySelector("input")\n4. Try: $0.value = "test data"\n5. Test: document.forms[0].checkValidity()\n\n🐛 Common error patterns:\n• "Cannot read property" - Check if element exists\n• "Not defined" - Variable/function doesn\'t exist\n• "Permission denied" - CORS or security restriction\n\n💡 Pro tip for testers:\nUse Console to test JavaScript functions before writing automation scripts. Perfect for experimenting with selectors and form interactions!',
      
      'learn.course.network.title': 'Network Panel',
      'learn.course.network.description': 'Monitor API calls and debug network issues effectively.',
      'learn.course.network.content': '🌐 Network Panel - API Testing Center\n\nThe Network panel shows all HTTP requests - perfect for API testing and debugging.\n\n🎯 What you can monitor:\n• API calls and responses\n• Loading times and performance\n• Failed requests and errors\n• Form submissions\n• File uploads/downloads\n\n🔍 Key features:\n\n1. **Request analysis**\n   • Status codes (200, 404, 500)\n   • Request/response headers\n   • Request payload data\n   • Response content\n   • Timing information\n\n2. **Common testing tasks**\n   • Verify API endpoints are called\n   • Check request parameters\n   • Validate response data\n   • Debug authentication issues\n   • Test error scenarios\n\n3. **Quick debugging**\n   • Red requests = failed calls\n   • Look for 4xx/5xx status codes\n   • Check "Response" tab for error messages\n   • Verify request headers for auth tokens\n\n⚡ Practical exercise:\n1. Open a page with forms/buttons\n2. Press F12 → Network tab\n3. Click "Clear" to reset\n4. Submit forms or click buttons\n5. Watch requests appear in real-time\n6. Click request to see details\n\n🚨 Common issues to check:\n• CORS errors (blocked by browser)\n• 401/403 errors (authentication)\n• 404 errors (wrong URL)\n• 500 errors (server issues)\n• Timeout errors (slow network)\n\n💡 Pro tip for testers:\nUse "Copy as cURL" to replay API calls in Postman or automation tools. Right-click request → Copy → Copy as cURL!',
      
      'learn.course.sources.title': 'Sources Panel',
      'learn.course.sources.description': 'Debug JavaScript with breakpoints and step-by-step debugging.',
      'learn.course.sources.content': '🔍 Sources Panel - JavaScript Debugger\n\nThe Sources panel allows debugging JavaScript code with breakpoints and step-by-step execution.\n\n🎯 Basic debugging features:\n• Setting breakpoints in code\n• Stepping through code line by line\n• Checking variable values\n• Watching expressions\n• Debugging asynchronous code\n\n🛠️ Essential debugging skills:\n\n1. **Setting breakpoints**\n   • Click line numbers to set breakpoints\n   • Red dot = active breakpoint\n   • Code will pause at breakpoints\n   • Check variables during pause\n\n2. **Step-by-step control**\n   • F8 - Resume execution\n   • F10 - Step over (next line)\n   • F11 - Step into (enter function)\n   • Shift+F11 - Step out (exit function)\n\n3. **Checking variables**\n   • Hover over variables to see values\n   • Use "Scope" panel for all variables\n   • Add "Watch" expressions for monitoring\n   • Check "Call Stack" for function history\n\n⚡ Quick debugging exercise:\n1. Open a page with JavaScript\n2. Press F12 → Sources tab\n3. Find .js file in file tree\n4. Click line number to set breakpoint\n5. Interact with page to trigger code\n6. Use F10 to step through code\n\n🐛 When to use Sources panel:\n• JavaScript errors you don\'t understand\n• Functions not working as expected\n• Need to see variable values during execution\n• Complex logic requiring step-by-step review\n\n💡 Pro tip for testers:\nUse "Pause on exceptions" to automatically stop when errors occur. Great for catching bugs you didn\'t know existed!',
      
      'learn.course.application.title': 'Application Panel',
      'learn.course.application.description': 'Manage cookies, storage, and PWA features for comprehensive testing.',
      'learn.course.application.content': '🗄️ Application Panel - Storage & Data Manager\n\nThe Application panel manages browser storage, cookies, and PWA features.\n\n🎯 What you can manage:\n• Cookies and session data\n• Local/Session Storage\n• IndexedDB databases\n• Service Workers\n• Cache Storage\n\n🔧 Basic storage testing:\n\n1. **Cookies**\n   • Browse all cookies for domain\n   • Edit cookie values\n   • Delete specific cookies\n   • Test login/logout flows\n\n2. **Local Storage**\n   • See all key-value pairs\n   • Add/edit/delete entries\n   • Test data persistence\n   • Clear entire storage\n\n3. **Session Storage**\n   • Similar to Local Storage\n   • Data only for session duration\n   • Perfect for testing temporary data\n\n⚡ Common testing scenarios:\n\n**Test user preferences:**\n1. Change language/theme settings\n2. Check if saved in Local Storage\n3. Refresh page to verify persistence\n\n**Test login sessions:**\n1. Login to website\n2. Check Cookies for auth tokens\n3. Delete auth cookies\n4. Refresh to test logout behavior\n\n**Test data persistence:**\n1. Fill out forms\n2. Check if data saved in storage\n3. Clear storage and test data loss\n\n🛠️ Quick exercise:\n1. Open any website\n2. Press F12 → Application tab\n3. Click "Local Storage" → domain name\n4. Add test entry: key="test", value="hello"\n5. Refresh page - data should remain\n6. Try same with "Session Storage"\n\n💡 Pro tip for testers:\nUse "Clear storage" to reset all data at once. Perfect for testing new user experiences!',
      
      'learn.course.performance.title': 'Performance Panel',
      'learn.course.performance.description': 'Analyze page speed and identify performance bottlenecks.',
      'learn.course.performance.content': '⚡ Performance Panel - Speed Analysis Tool\n\nThe Performance panel helps find and fix page performance issues.\n\n🎯 What you can analyze:\n• Page loading speed\n• JavaScript execution time\n• Rendering performance\n• Memory usage\n• User interaction delays\n\n🔍 Key performance metrics:\n\n1. **Loading performance**\n   • Time to first content\n   • Time to interactive\n   • Resource loading times\n   • Network bottlenecks\n\n2. **Execution performance**\n   • JavaScript execution time\n   • Layout and paint times\n   • Memory usage patterns\n   • Frame rate analysis\n\n🛠️ How to use Performance panel:\n\n1. **Recording performance**\n   • Click "Record" button\n   • Interact with page\n   • Click "Stop" to analyze\n   • Review timeline\n\n2. **Analyzing results**\n   • Look for red bars (slow operations)\n   • Check "Main" thread for bottlenecks\n   • Review "Network" for slow requests\n   • Monitor "Memory" for leaks\n\n⚡ Quick performance test:\n1. Open a slow webpage\n2. Press F12 → Performance tab\n3. Click "Record" button\n4. Refresh the page\n5. Click "Stop" after loading\n6. Look for red bars in timeline\n\n🚨 Common performance issues:\n• Large JavaScript files\n• Unoptimized images\n• Too many HTTP requests\n• Memory leaks\n• Slow database queries\n\n💡 Pro tip for testers:\nUse "Screenshots" option to see visual progress during loading. Great for identifying when content becomes visible to users!',
      
      'learn.course.lighthouse.title': 'Lighthouse Audits',
      'learn.course.lighthouse.description': 'Run automated quality audits for performance, accessibility, and SEO.',
      'learn.course.lighthouse.content': '🔍 Lighthouse - Automated Quality Audits\n\nLighthouse automatically tests your page for performance, accessibility, SEO, and best practices.\n\n🎯 What Lighthouse checks:\n• Performance (loading speed)\n• Accessibility (screen readers, contrast)\n• SEO (search engine optimization)\n• Best practices (security, modern standards)\n• PWA (Progressive Web App features)\n\n🛠️ How to run Lighthouse:\n\n1. **Open Lighthouse**\n   • Press F12 → Lighthouse tab\n   • Select audit categories\n   • Choose device (mobile/desktop)\n   • Click "Generate report"\n\n2. **Reading reports**\n   • Scores from 0-100 (higher = better)\n   • Red/yellow/green indicators\n   • Specific improvement suggestions\n   • Before/after comparisons\n\n⚡ Quick Lighthouse audit:\n1. Open any webpage\n2. Press F12 → Lighthouse tab\n3. Select all categories\n4. Click "Generate report"\n5. Wait for analysis to complete\n6. Review results and recommendations\n\n🎯 Common issues found:\n• Unoptimized images\n• Missing alt text\n• Slow loading times\n• Poor mobile experience\n• Missing meta descriptions\n• Security vulnerabilities\n\n📊 Understanding scores:\n• 90-100: Excellent\n• 50-89: Needs improvement\n• 0-49: Poor\n\n💡 Pro tip for testers:\nRun Lighthouse before and after changes to measure improvement. Perfect for proving your optimizations actually work!\n\n🔧 Quick wins:\n• Compress images\n• Add alt text to images\n• Improve color contrast\n• Add meta descriptions\n• Enable HTTPS\n• Minify CSS/JavaScript',
      
      // Difficulty levels
      'difficulty.beginner': 'Beginner',
      'difficulty.medium': 'Medium',
      
      // Cookie Banner
      'cookie.title': '🍪 We use cookies',
      'cookie.description': 'We use cookies to remember your challenge progress, language preferences, and login sessions. This helps us provide a better user experience.',
      'cookie.acceptAll': 'Accept all',
      'cookie.onlyNecessary': 'Only necessary',
      
      // Challenge Wrapper
      'challenge.completed.title': 'Challenge Completed!',
      'challenge.completed.description': 'Great job! You can try again or move on to the next challenge.',
      'challenge.completed.tryAgain': 'Try Again',
      'challenge.completed.resetting': 'Resetting...',
      'challenge.retake.title': 'Retake Mode',
      'challenge.retake.description': 'You can attempt this challenge again. Your progress and points remain unchanged.',
      'challenge.retake.hide': 'Hide',
      'challenge.reset.confirm': 'Are you sure you want to reset this challenge? You will lose progress for this task.',
      'challenge.reset.error': 'Error resetting challenge. Please try again.',
      'QA Interactive Challenges': 'QA Interactive Challenges',
      'Test your QA skills with real-world scenarios. Find bugs, identify security issues, and improve application quality.': 'Test your QA skills with real-world scenarios. Find bugs, identify security issues, and improve application quality.',
      'Start Challenge': 'Start Challenge',
      'Review Challenge': 'Review Challenge',
      'Try Again': 'Try Again',
      'challenges': {
        'yourProgress': 'Your Progress',
        'completed': 'Completed',
        'points': 'Points',
        'noMatchingChallenges': 'No challenges match your current filters.',
        'difficulty': {
          'all': 'All Difficulties',
          'easy': 'Easy',
          'medium': 'Medium',
          'hard': 'Hard'
        },
        'category': {
          'all': 'All Categories'
        }
      }
    }
  },
  pl: {
    translation: {
      // Navigation
      'Home': 'Strona główna',
      'Challenges': 'Wyzwania',
      'Playground': 'Playground',
      'Learn': 'Kursy',
      'Community': 'Społeczność',
      'Dashboard': 'Panel',
      'Logout': 'Wyloguj',
      'Login': 'Zaloguj',
      'Sign Up': 'Załóż konto',
      
      // Main page - Hero Section
      'Testing Community': 'Społeczność Testerów',
      'home.hero.title': 'Rozwijaj Umiejętności Testerskie',
      'home.hero.description': 'Podnieś swoje kompetencje QA dzięki interaktywnym wyzwaniom, rzeczywistym scenariuszom i praktycznej nauce.',
      
      // Why Choose Section
      'home.whyChoose.title': 'Dlaczego Testing Forge?',
      'home.whyChoose.realWorld.title': 'Praktyczne Wyzwania',
      'home.whyChoose.realWorld.description': 'Ćwicz na scenariuszach odzwierciedlających rzeczywiste sytuacje testerskie z branży.',
      'home.whyChoose.handson.title': 'Nauka przez Praktykę',
      'home.whyChoose.handson.description': 'Ucz się robiąc - interaktywne wyzwania i praktyczne ćwiczenia.',
      'home.whyChoose.community.title': 'Aktywna Społeczność',
      'home.whyChoose.community.description': 'Łącz się z innymi testerami i dziel się doświadczeniami.',
      'home.whyChoose.current.title': 'Bądź na Bieżąco',
      'home.whyChoose.current.description': 'Poznawaj najnowsze techniki testerskie i najlepsze praktyki branżowe.',
      'Start Learning →': 'Rozpocznij naukę →',
      'Login to Browse Challenges': 'Zaloguj się, aby przeglądać wyzwania',
      'Login to Try Challenges': 'Zaloguj się, aby próbować wyzwań',
      
      // Homepage registration benefits PL
      'home.hero.subtitle': 'Dołącz do tysięcy testerów rozwijających swoje umiejętności na naszej interaktywnej platformie.',
      'home.benefits.title': 'Co zyskujesz po rejestracji',
      'home.benefits.subtitle': 'Odblokuj swój pełny potencjał dzięki ekskluzywnym funkcjom dostępnym tylko dla zarejestrowanych członków.',
      'home.benefits.challenges.title': '18+ Interaktywnych Wyzwań',
      'home.benefits.challenges.description': 'Dostęp do kompletnej biblioteki praktycznych wyzwań testerskich obejmujących UI, API, DevTools przeglądarki i więcej.',
      'home.benefits.learning.title': 'Kompleksowe Ścieżki Nauki',
      'home.benefits.learning.description': 'Podążaj strukturalnymi kursami od poziomu początkującego do zaawansowanego z opanowaniem DevTools i technikami QA wspomaganymi AI.',
      'home.benefits.playground.title': 'Playground Automatyzacji',
      'home.benefits.playground.description': 'Ćwicz automatyzację testów z rzeczywistymi scenariuszami - formularze, drag & drop, upload plików i interakcje przeglądarki.',
      'home.benefits.progress.title': 'Śledź Swój Postęp',
      'home.benefits.progress.description': 'Monitoruj swoją podróż edukacyjną z szczegółowymi dashboardami, systemem punktów i śledzeniem osiągnięć.',
      'home.benefits.community.title': 'Dołącz do Społeczności',
      'home.benefits.community.description': 'Łącz się z innymi testerami, dziel się doświadczeniami i otrzymuj pomoc od naszej wspierającej społeczności.',
      'home.benefits.certificates.title': 'Zdobywaj Certyfikaty',
      'home.benefits.certificates.description': 'Zyskaj uznanie za swoje osiągnięcia dzięki certyfikatom ukończenia i odznakom umiejętności.',
      'home.cta.title': 'Gotowy na Podniesienie Swoich Umiejętności Testerskich?',
      'home.cta.subtitle': 'Dołącz do naszej społeczności profesjonalnych testerów i rozpocznij swoją podróż już dziś.',
      'home.cta.register': 'Utwórz Darmowe Konto',
      'home.cta.login': 'Masz już konto? Zaloguj się',
      
      // Sample Challenge Section
      'home.sampleChallenge.title': 'Wypróbuj Przykładowe Wyzwanie',
      'home.sampleChallenge.apiTitle': 'Wyzwanie Testowania API',
      'home.sampleChallenge.description': 'Przetestuj endpoint REST API zarządzający profilami użytkowników. Twoim zadaniem jest:',
      'home.sampleChallenge.task1': 'Sprawdź, czy endpoint GET /users zwraca poprawne dane użytkowników',
      'home.sampleChallenge.task2': 'Przetestuj POST /users z obsługą nieprawidłowych danych',
      'home.sampleChallenge.task3': 'Zaimplementuj właściwą obsługę błędów',
      'home.sampleChallenge.try': 'Wypróbuj To Wyzwanie',
      
      // Audience Section
      'home.audience.title': 'Dla kogo to jest?',
      'home.audience.beginner.title': 'Początkujący Testerzy',
      'home.audience.beginner.description': 'Rozpocznij swoją podróż testerską z podstawowymi konceptami i prostymi wyzwaniami.',
      'home.audience.midLevel.title': 'Testerzy Średnio-Zaawansowani',
      'home.audience.midLevel.description': 'Rozwijaj swoje umiejętności z zaawansowanymi scenariuszami i wyzwaniami automatyzacji.',
      'home.audience.senior.title': 'Starsi Testerzy',
      'home.audience.senior.description': 'Prowadź inicjatywy testerskie i przygotuj się na przyszłe workflow wspierane przez AI.',
      
      // Technologies Section
      'home.technologies.title': 'Omawiane Technologie',
      'home.technologies.selenium': 'Selenium',
      'home.technologies.playwright': 'Playwright',
      'home.technologies.postman': 'Postman',
      'home.technologies.devtools': 'DevTools',
      
      // Future Roadmap Section
      'home.roadmap.title': 'Przyszła Ścieżka Nauki',
      'home.roadmap.description': 'Budujemy coś wyjątkowego dla społeczności QA. Po zbudowaniu solidnej bazy użytkowników uruchomimy ekskluzywny kurs.',
      'home.roadmap.aiCourse.title': 'Wkrótce: Agenci AI dla QA',
      'home.roadmap.aiCourse.description': 'Naucz się budować i implementować agentów AI do testowania, aby zrewolucjonizować swoje workflow QA. Ten zaawansowany kurs będzie dostępny dla członków naszej społeczności.',
      'home.roadmap.aiCourse.note': 'Ten kurs zostanie uruchomiony po zbudowaniu silnej społeczności testerów.',
      
      // Testimonials Section
      'home.testimonials.title': 'Co Mówią Nasi Użytkownicy',
      'home.testimonials.sarah': 'Interaktywne wyzwania znacznie pomogły mi poprawić umiejętności testerskie. Gorąco polecam!',
      'home.testimonials.michael': 'Najlepsza platforma do nauki nowoczesnych technik testowania. Społeczność jest niesamowicie wspierająca.',
      'home.testimonials.david': 'Scenariusze z rzeczywistego świata to dokładnie to, czego potrzebowałem do przygotowania się na karierę testera.',
      
      // Playground
      'playground.title': 'Playground Automatyzacji',
      'playground.description': 'Witaj w Playground Automatyzacji! To jest Twoje dedykowane miejsce do ćwiczenia automatyzacji web. Każdy moduł zapewnia kontrolowane środowisko do praktyki różnych scenariuszy automatyzacji z narzędziami takimi jak Selenium, Playwright, czy Cypress. Bez flag czy wyzwań - tylko czysta praktyka automatyzacji!',
      'playground.tips': 'Wskazówki',
      
      // Playground modules
      'playground.module.dynamicUI.label': 'Dynamiczny UI',
      'playground.module.dynamicUI.title': 'Dynamiczne Elementy UI',
      'playground.module.dynamicUI.description': 'Ćwicz automatyzację interakcji z elementami pojawiającymi się i znikającymi dynamicznie. Idealne do nauki strategii czekania i wykrywania elementów.',
      'playground.module.dynamicUI.tips': 'Używaj jawnych waitów do obsługi widoczności elementu. Rozważ strategie pollingowe dla większej niezawodności. Obsłuż potencjalny StaleElementReferenceException.',
      'playground.module.dynamicUI.simulation': 'Ten moduł symuluje przycisk, który pojawia się i znika co 5 sekund. Ćwicz czekanie na dynamiczne elementy i interakcję z nimi.',
      'playground.module.dynamicUI.button': 'Kliknij mnie!',
      
      'playground.module.ajax.label': 'Żądania AJAX',
      'playground.module.ajax.title': 'Żądania AJAX',
      'playground.module.ajax.description': 'Trenuj umiejętności automatyzacji z asynchronicznym ładowaniem danych. Naucz się obsługi stanów ładowania i czekania na dynamiczne treści.',
      'playground.module.ajax.tips': 'Czekaj aż spinner ładowania zniknie. Używaj jawnych waitów na pojawienie się danych. Rozważ własne warunki oczekiwania.',
      'playground.module.ajax.simulation': 'Ten moduł symuluje asynchroniczne ładowanie danych ze spinnerem. Ćwicz obsługę dynamicznych treści i stanów ładowania.',
      'playground.module.ajax.loading': 'Ładowanie danych...',
      'playground.module.ajax.loadData': 'Załaduj dane',
      
      'playground.module.form.label': 'Walidacja Formularza',
      'playground.module.form.title': 'Walidacja Formularza',
      'playground.module.form.description': 'Ćwicz automatyzację interakcji z formularzami z walidacją w czasie rzeczywistym. Naucz się obsługi walidacji i wysyłania formularzy.',
      'playground.module.form.tips': 'Waliduj wszystkie pola przed wysłaniem. Obsłuż komunikaty o błędach i przypadki brzegowe. Testuj poprawne i niepoprawne dane.',
      'playground.module.form.simulation': 'Ten moduł zapewnia formularz z walidacją w czasie rzeczywistym. Ćwicz automatyzację formularzy z różnymi typami pól i regułami walidacji.',
      'playground.module.form.name': 'Imię',
      'playground.module.form.email': 'Email',
      'playground.module.form.phone': 'Numer telefonu',
      'playground.module.form.submit': 'Wyślij',
      'playground.module.form.errorName': 'Imię jest wymagane',
      'playground.module.form.errorEmail': 'Nieprawidłowy format email',
      'playground.module.form.errorPhone': 'Telefon musi mieć co najmniej 9 cyfr',
      'playground.module.form.success': 'Formularz wysłany pomyślnie!',
      
      'playground.module.iframe.label': 'iFrame i Modale',
      'playground.module.iframe.title': 'iFrame i Modale',
      'playground.module.iframe.description': 'Ćwicz automatyzację interakcji z iframe i modalami. Naucz się przełączania kontekstu i obsługi zagnieżdżonych elementów.',
      'playground.module.iframe.tips': 'Przełącz do kontekstu iframe przed interakcją z elementami. Używaj odpowiednich strategii czekania na pojawienie się modali. Testuj zamykanie iframe i modali.',
      'playground.module.iframe.simulation': 'Ten moduł demonstruje interakcje z iframe i modalami. Ćwicz przełączanie kontekstów i obsługę zagnieżdżonych elementów.',
      'playground.module.iframe.openModal': 'Otwórz Modal',
      'playground.module.iframe.modalTitle': 'Zawartość Modala',
      'playground.module.iframe.button': 'Ukryty Przycisk',
      'playground.module.iframe.openIframe': 'Otwórz iFrame',
      
      'playground.module.table.label': 'Tabele i Listy',
      'playground.module.table.title': 'Tabele i Listy',
      'playground.module.table.description': 'Ćwicz automatyzację interakcji z tabelami, sortowanie i wybieranie danych. Naucz się obsługi dynamicznych danych w tabelach.',
      'playground.module.table.tips': 'Sortuj tabele przed wyborem danych. Weryfikuj zawartość po akcjach. Obsłuż dynamiczne wiersze i kolumny.',
      'playground.module.table.simulation': 'Ten moduł symuluje tabelę produktów z możliwością sortowania i filtrowania. Ćwicz automatyzację interakcji z tabelami i weryfikację danych.',
      'playground.module.table.product': 'Produkt',
      'playground.module.table.price': 'Cena',
      'playground.module.table.product1': 'Plan Premium',
      'playground.module.table.product2': 'Plan Podstawowy',
      'playground.module.table.product3': 'Plan Standardowy',
      'playground.module.table.product4': 'Plan Enterprise',
      
      'playground.module.select.label': 'Lista rozwijana',
      'playground.module.select.title': 'Lista rozwijana',
      'playground.module.select.description': 'Ćwicz automatyzację wyboru z list rozwijanych. Naucz się obsługiwać elementy <select> i weryfikować wybrane wartości.',
      'playground.module.select.tips': 'Użyj selectByValue lub selectByVisibleText w narzędziu automatyzującym. Weryfikuj wybraną wartość po interakcji. Obsłuż dynamiczne i zablokowane opcje.',
      'playground.module.select.simulation': 'Ten moduł symuluje listę rozwijaną z różnymi opcjami. Ćwicz wybieranie różnych wartości i weryfikację wyboru.',
      'playground.module.select.choose': 'Wybierz opcję:',
      'playground.module.select.select': 'Wybierz wartość',
      'playground.module.select.apple': 'Jabłko',
      'playground.module.select.banana': 'Banan',
      'playground.module.select.cherry': 'Wiśnia',
      'playground.module.select.grape': 'Winogrono',
      'playground.module.select.selected': 'Wybrano: {value}',
      
      'playground.module.choices.label': 'Checkboxy i Radio',
      'playground.module.choices.title': 'Checkboxy i Przyciski Radio',
      'playground.module.choices.description': 'Ćwicz automatyzację zaznaczania checkboxów i przycisków radio. Naucz się zaznaczać, odznaczać i weryfikować opcje.',
      'playground.module.choices.tips': 'Używaj akcji click lub check dla checkboxów/radio. Weryfikuj stan po interakcji. Testuj dostępność z klawiatury (Tab, Spacja, Strzałki).',
      'playground.module.choices.simulation': 'Ten moduł zapewnia checkboxy i przyciski radio do ćwiczeń. Naucz się obsługi wielokrotnych wyborów i weryfikacji stanów.',
      'playground.module.choices.subscribe': 'Subskrybuj',
      'playground.module.choices.newsletter': 'Newsletter',
      'playground.module.choices.updates': 'Aktualizacje produktu',
      'playground.module.choices.choosePlan': 'Wybierz swój plan',
      'playground.module.choices.basic': 'Podstawowy',
      'playground.module.choices.pro': 'Profesjonalny',
      
      // New modules
      'playground.module.dragDrop.label': 'Przeciągnij i Upuść',
      'playground.module.dragDrop.title': 'Automatyzacja Drag & Drop',
      'playground.module.dragDrop.description': 'Ćwicz automatyzację operacji przeciągania i upuszczania z interaktywną tablicą Kanban. Naucz się obsługi zdarzeń drag i weryfikacji pozycji elementów.',
      'playground.module.dragDrop.tips': 'Używaj atrybutów data-testid do identyfikacji źródeł i celów przeciągania. Testuj drag & drop używając metod specyficznych dla frameworka (np. page.dragAndDrop() w Playwright). Weryfikuj, że elementy pojawiają się w odpowiednich kontenerach po upuszczeniu. Sprawdzaj, czy liczba elementów w kolumnach jest aktualizowana. Testuj przypadki brzegowe jak upuszczanie w tym samym kontenerze.',
      'playground.module.dragDrop.todo': 'Do zrobienia',
      'playground.module.dragDrop.inProgress': 'W trakcie',
      'playground.module.dragDrop.done': 'Zrobione',
      'playground.module.dragDrop.automationTips': 'Wskazówki automatyzacji',
      
      'playground.module.fileUpload.label': 'Upload Plików',
      'playground.module.fileUpload.title': 'Testowanie Upload i Download Plików',
      'playground.module.fileUpload.description': 'Ćwicz automatyzację operacji upload i download plików. Naucz się obsługi inputów plików i weryfikacji sukcesu uploadu.',
      'playground.module.fileUpload.tips': 'Używaj selektorów input[type="file"] i metody .setInputFiles(). Weryfikuj, że plik pojawia się w obszarze uploadu po wybraniu. Sprawdzaj wskaźniki postępu i komunikaty o sukcesie. Testuj funkcjonalność pobierania klikając linki download. Waliduj ograniczenia typów plików i rozmiarów.',
      'playground.module.fileUpload.area': 'Obszar uploadu plików',
      'playground.module.fileUpload.uploading': 'Wysyłanie pliku...',
      'playground.module.fileUpload.success': 'Upload zakończony sukcesem!',
      'playground.module.fileUpload.file': 'Plik',
      'playground.module.fileUpload.size': 'Rozmiar',
      'playground.module.fileUpload.download': 'Pobierz plik',
      
      'playground.module.alerts.label': 'Alerty Przeglądarki',
      'playground.module.alerts.title': 'Obsługa Alertów i Okien Dialogowych',
      'playground.module.alerts.description': 'Ćwicz obsługę alertów JavaScript, potwierdzeń i promptów. Naucz się akceptować, odrzucać i wchodzić w interakcje z oknami dialogowymi przeglądarki.',
      'playground.module.alerts.tips': 'Używaj page.on("dialog") do obsługi alertów zanim się pojawią. Akceptuj dialogi z dialog.accept() lub odrzucaj z dialog.dismiss(). Dla promptów używaj dialog.accept(text) do wprowadzania tekstu. Testuj zarówno akceptowanie jak i odrzucanie dialogów. Weryfikuj zmiany stanu strony po interakcjach z dialogami.',
      'playground.module.alerts.practice': 'Ćwicz automatyzację obsługi okien dialogowych (alert, confirm, prompt)',
      'playground.module.alerts.showAlert': 'Pokaż Alert',
      'playground.module.alerts.showConfirm': 'Pokaż Potwierdzenie',
      'playground.module.alerts.showPrompt': 'Pokaż Prompt',
      'playground.module.alerts.lastAction': 'Ostatnia akcja:',
      
      'playground.module.localization.label': 'Lokalizacja',
      'playground.module.localization.title': 'Lokalizacja i Przełączanie Języków',
      'playground.module.localization.description': 'Ćwicz testowanie aplikacji wielojęzycznych i funkcji lokalizacji. Naucz się weryfikować zmiany tekstu i adaptacje układu.',
      'playground.module.localization.tips': 'Testuj przełączanie języków klikając selektory języków. Weryfikuj zmiany tekstu w wielu elementach UI po zmianie języka. Sprawdzaj, czy układy stron dostosowują się do różnych długości tekstu. Testuj języki RTL (right-to-left) jeśli są obsługiwane. Waliduj, że etykiety formularzy, komunikaty błędów i tooltips są przetłumaczone.',
      'playground.module.localization.welcome': 'Witaj w Testing Forge!',
      'playground.module.localization.description_text': 'To jest platforma do nauki automatyzacji testów.',
      'playground.module.localization.start_learning': 'Rozpocznij Naukę',
      'playground.module.localization.help': 'Pomoc',
      'playground.module.localization.current_language': 'Obecny język: Polski',
      'playground.module.localization.tips.1': 'Testuj przełączanie języków klikając selektory języków',
      'playground.module.localization.tips.2': 'Weryfikuj zmiany tekstu w wielu elementach UI po zmianie języka',
      'playground.module.localization.tips.3': 'Sprawdzaj, czy układy stron dostosowują się do różnych długości tekstu',
      'playground.module.localization.tips.4': 'Testuj języki RTL (right-to-left) jeśli są obsługiwane',
      'playground.module.localization.tips.5': 'Waliduj, że etykiety formularzy, komunikaty błędów i tooltips są przetłumaczone',
      
      // Challenge translations PL
      'challenge.secretMessage.title': 'Tajna Wiadomość',
      'challenge.secretMessage.description': 'Zakoduj wiadomość do base64 (popularne kodowanie webowe).',
      'challenge.secretMessage.category': 'Logika',
      'challenge.orderMatters.title': 'Kolejność Ma Znaczenie!',
      'challenge.orderMatters.description': 'Ułóż przypadki testowe w poprawnej kolejności (przeciągnij i upuść).',
      'challenge.orderMatters.category': 'UI',
      'challenge.uiBugHunt.title': 'Polowanie na Błędy UI',
      'challenge.uiBugHunt.description': 'Znajdź i kliknij ukryty (prawdziwy) przycisk submit w uszkodzonym formularzu.',
      'challenge.uiBugHunt.category': 'UI',
      'challenge.hiddenParameter.title': 'Ukryty Parametr',
      'challenge.hiddenParameter.description': 'Dodaj poprawny parametr do URL, aby odsłonić flagę.',
      'challenge.hiddenParameter.category': 'Web',
      'challenge.cookieInspector.title': 'Inspektor Ciasteczek',
      'challenge.cookieInspector.description': 'Znajdź flagę ukrytą w ciasteczkach przeglądarki.',
      'challenge.cookieInspector.category': 'Przeglądarka',
      'challenge.jsonExplorer.title': 'Eksplorator JSON',
      'challenge.jsonExplorer.description': 'Znajdź flagę w odpowiedzi JSON na stronie.',
      'challenge.jsonExplorer.category': 'API',
      'challenge.xhrDetective.title': 'Detektyw XHR',
      'challenge.xhrDetective.description': 'Zbadaj żądanie API i znajdź token Authorization w nagłówkach.',
      'challenge.xhrDetective.category': 'API',
      'challenge.cssDebugger.title': 'Debugger CSS',
      'challenge.cssDebugger.description': 'Znajdź i napraw styl CSS blokujący interakcję z przyciskiem w DevTools.',
      'challenge.cssDebugger.category': 'UI',
      'challenge.cookieHacker.title': 'Cookie Hacker',
      'challenge.cookieHacker.description': 'Ustaw poprawne ciasteczko w DevTools, aby odblokować panel admina i zobaczyć flagę.',
      'challenge.cookieHacker.category': 'Przeglądarka',
      'challenge.localStorageInspector.title': 'Inspektor LocalStorage',
      'challenge.localStorageInspector.description': 'Edytuj LocalStorage, aby włączyć premium i zobaczyć flagę po odświeżeniu.',
      'challenge.localStorageInspector.category': 'Web',
      'challenge.brokenDom.title': 'Uszkodzony DOM',
      'challenge.brokenDom.description': 'Napraw uszkodzony formularz rejestracji w DOM, aby działał i umożliwiał wysłanie flagi.',
      'challenge.brokenDom.category': 'UI',
      'challenge.jsonValidator.title': 'Walidator JSON',
      'challenge.jsonValidator.description': 'Poćwicz ręczną walidację odpowiedzi JSON',
      'challenge.jsonValidator.category': 'API',
      'challenge.elementHighlighter.title': 'Podświetlanie Elementu',
      'challenge.elementHighlighter.description': 'W DevTools otwórz panel Elements, znajdź nagłówek <h1 id="main-title"> i dodaj mu styl outline: 3px solid red;. W atrybucie data-flag tego elementu znajdziesz flagę.',
      'challenge.elementHighlighter.category': 'UI',
      'challenge.networkTiming.title': 'Czas Sieci',
      'challenge.networkTiming.description': 'W zakładce Network odśwież stronę. Kliknij na pierwszy request (np. do /api/config). W zakładce Headers w polu response headers znajdziesz nagłówek X-Flag-Code, którego wartość to flaga.',
      'challenge.networkTiming.category': 'API',
      'challenge.formInputFuzzer.title': 'Fuzzer Pola Formularza',
      'challenge.formInputFuzzer.description': 'Na stronie rejestracji wypełnij wszystkie pola ekstremalnie długim ciągiem (np. 200-znakowy losowy string). Po kliknięciu "Submit" w odpowiedzi JSON (zakładka Network → Preview) będzie pole flag.',
      'challenge.formInputFuzzer.category': 'Web',
      'challenge.raceConditionTester.title': 'API – Flaga w zamówieniu',
      'challenge.raceConditionTester.description': 'Edytuj poniższy JSON i dodaj pole "flag": true. Następnie wyślij POST. Jeśli serwer otrzyma flag: true, zwróci flagę w odpowiedzi. Znajdź flagę w odpowiedzi i wpisz ją poniżej.',
      'challenge.raceConditionTester.category': 'API',
      'challenge.domMutationObserver.title': 'Obserwator Mutacji DOM',
      'challenge.domMutationObserver.description': 'Na liście produktów kliknij "Load more". W konsoli uruchom podany kod MutationObserver. Następnie kliknij "Load more" – w konsoli zobaczysz flagę.',
      'challenge.domMutationObserver.category': 'UI',
      'challenge.accessibilityAudit.title': 'Audyt Dostępności',
      'challenge.accessibilityAudit.description': 'Użyj TAB, aby przechodzić po interaktywnych elementach poniżej. Jeden z nich nie może być wybrany klawiszem TAB (jest niedostępny dla klawiatury). Podaj id tego elementu, aby odblokować pole na flagę.',
      'challenge.accessibilityAudit.category': 'Web',
      
      // SQL Challenges PL
      'SQL Orders Total Challenge': 'Wyzwanie SQL - Suma Zamówień',
      'Calculate the total amount of orders for a specific customer using SQL SUM function.': 'Oblicz łączną kwotę zamówień dla konkretnego klienta używając funkcji SQL SUM.',
      'SQL Login Frequency Challenge': 'Wyzwanie SQL - Częstotliwość Logowań',
      'Find the user with the most frequent logins in the last 30 days using SQL GROUP BY and COUNT.': 'Znajdź użytkownika z najczęstszymi logowaniami w ostatnich 30 dniach używając SQL GROUP BY i COUNT.',
      
      // Hard Challenges PL
      'Encoded Token Challenge': 'Wyzwanie Zakodowanego Tokenu',
      'JWT token with exposed secret key in source code. Create a valid token with premium_user role to access the flag.': 'Token JWT z ujawnionym kluczem w kodzie źródłowym. Stwórz poprawny token z rolą premium_user aby uzyskać dostęp do flagi.',
      'CSS Puzzle Challenge': 'Wyzwanie Zagadki CSS',
      'Flag hidden using advanced CSS techniques. Write CSS code to make the hidden flag visible.': 'Flaga ukryta przy użyciu zaawansowanych technik CSS. Napisz kod CSS aby ujawnić ukrytą flagę.',
      
      // Log Challenges PL
      'Unauthorized Access Log Challenge': 'Wyzwanie Analizy Logów - Nieautoryzowany Dostęp',
      'Analyze server logs to find the IP address with the most failed login attempts (status code 401).': 'Przeanalizuj logi serwera aby znaleźć adres IP z największą liczbą nieudanych prób logowania (kod statusu 401).',
      'Slowest Request Challenge': 'Wyzwanie Najwolniejszego Żądania',
      'Find the endpoint with the longest response time among successful requests (status 200).': 'Znajdź endpoint z najdłuższym czasem odpowiedzi spośród udanych żądań (status 200).',
      
      // Categories PL
      'sql': 'SQL',
      'cryptography': 'Kryptografia',
      'css': 'CSS',
      'logs': 'Logi',
      // Learn translations PL
      'learn.courses.title': 'Kursy',
      'learn.courses.description': 'Kompleksowe, kilkutygodniowe programy nauki. Dostęp płatny.',
      'learn.minicourses.title': 'Mini kursy',
      'learn.minicourses.description': 'Darmowe, szybkie lekcje dla rozwoju umiejętności QA.',
      'learn.course.aiqa.title': 'AI w automatyzacji QA',
      'learn.course.aiqa.description': 'Opanuj automatyzację QA z wykorzystaniem AI. Intensywny program 3-tygodniowy.',
      'learn.course.aiqa.level': 'Zaawansowany',
      'learn.course.aiqa.duration': '3 tygodnie',
      'learn.course.aiqa.cta': 'Zobacz szczegóły',
      'learn.minicourse.devtools.title': 'Mini kurs DevTools',
      'learn.minicourse.devtools.description': 'Szybkie, praktyczne lekcje DevTools dla testerów QA. Naucz się podstawowych umiejętności debugowania przeglądarki.',
      'learn.minicourse.devtools.duration': '1 godzina całość',
      'learn.minicourse.devtools.cta': 'Zacznij teraz',
      'learn.comingSoon': 'Wkrótce dostępny',
      'learn.moduleNotFound': 'Moduł nie znaleziony',
      'learn.backToCourses': '← Powrót do kursów',
      
      // DevTools Course modules PL - nowe krótkie wersje
      'learn.course.introduction.title': 'Podstawy DevTools',
      'learn.course.introduction.description': 'Szybkie wprowadzenie do DevTools przeglądarki - Twojego podstawowego zestawu narzędzi testerskich.',
      'learn.course.introduction.content': '🔧 Podstawy DevTools - Twój Zestaw Narzędzi\n\nDevTools przeglądarki to Twoje najważniejsze narzędzia testerskie. Każdy QA powinien je opanować.\n\n📋 Czym są DevTools?\n• Wbudowane w każdą nowoczesną przeglądarkę\n• Niezbędne do debugowania i testowania\n• Darmowe i zawsze dostępne\n• Bez konieczności instalacji\n\n🚀 Jak otworzyć DevTools:\n• Naciśnij F12 (Windows/Linux)\n• Cmd+Option+I (Mac)\n• Kliknij prawym → Zbadaj\n• Ctrl+Shift+I (Windows/Linux)\n\n🎯 Główne panele których będziesz używać:\n• Elements - inspekcja HTML/CSS\n• Console - debugowanie JavaScript\n• Network - wywołania API i żądania\n• Sources - debugowanie z breakpointami\n• Application - przechowywanie i PWA\n• Performance - analiza wydajności\n• Lighthouse - audyty jakości\n\n✨ Szybki sukces:\nSpróbuj teraz - kliknij prawym na dowolny element tej strony i wybierz "Zbadaj". Zobaczysz HTML i CSS tego elementu!\n\n💡 Pro tip:\nTrzymaj DevTools otwarte podczas testowania - szybciej wykryjesz błędy i zrozumiesz jak działają strony internetowe.',
      
      'learn.course.elements.title': 'Panel Elements',
      'learn.course.elements.description': 'Opanuj inspekcję HTML/CSS i edycję na żywo w kilka minut.',
      'learn.course.elements.content': '🎨 Panel Elements - Inspektor HTML/CSS\n\nPanel Elements pozwala na inspekcję i edycję HTML i CSS dowolnej strony w czasie rzeczywistym.\n\n🔍 Co możesz robić:\n• Przeglądać strukturę HTML strony\n• Edytować style CSS na żywo\n• Testować responsywne projekty\n• Debugować problemy z układem\n• Znajdować uszkodzone elementy\n\n🛠️ Podstawowe umiejętności:\n\n1. **Wybieranie elementów**\n   • Kliknij ikonę selektora (góra-lewo)\n   • Najedź na elementy strony\n   • Kliknij aby zbadać konkretny element\n   • Użyj skrótu Ctrl+Shift+C\n\n2. **Edycja CSS na żywo**\n   • Kliknij dowolną właściwość CSS aby edytować\n   • Dodawaj nowe style klikając puste miejsce\n   • Przełączaj style checkboxami\n   • Zobacz zmiany natychmiast na stronie\n\n3. **Typowe zadania testowe**\n   • Zmieniaj kolory przycisków aby testować widoczność\n   • Ukrywaj elementy aby testować mobile layout\n   • Edytuj tekst aby testować różne długości\n   • Testuj stany hover przyciskiem :hov\n\n⚡ Szybkie ćwiczenie:\n1. Otwórz dowolną stronę\n2. Naciśnij F12 aby otworzyć DevTools\n3. Kliknij narzędzie selektora\n4. Kliknij przycisk lub link\n5. W panelu Styles zmień background-color\n6. Zobacz jak zmiana następuje natychmiast!\n\n💡 Pro tip dla testerów:\nUżywaj panelu Elements do testowania edge case\'ów UI - długi tekst, brakujące obrazy, różne rozmiary ekranu. To szybsze niż zmienianie prawdziwego kodu!',
      
      'learn.course.console.title': 'Panel Console',
      'learn.course.console.description': 'Debuguj JavaScript i testuj fragmenty kodu jak profesjonalista.',
      'learn.course.console.content': '💻 Panel Console - Centrum Testowania JavaScript\n\nConsole to Twój plac zabaw JavaScript i centrum debugowania.\n\n🎯 Co możesz robić:\n• Wykonywać kod JavaScript natychmiast\n• Debugować błędy i problemy\n• Testować wywołania API\n• Sprawdzać zmienne\n• Monitorować zachowanie aplikacji\n\n🔧 Podstawowe komendy Console:\n\n1. **Podstawowe testowanie**\n   • console.log("Cześć") - Wypisuj wiadomości\n   • console.error("Problem") - Pokazuj błędy\n   • console.warn("Ostrzeżenie") - Pokazuj ostrzeżenia\n   • console.table(dane) - Wyświetlaj dane jako tabelę\n\n2. **Szybkie testowanie DOM**\n   • document.querySelector("button") - Znajdź elementy\n   • $0 - Aktualnie wybrany element\n   • $$("div") - Znajdź wszystkie elementy div\n   • inspect(element) - Przejdź do panelu Elements\n\n3. **Testowanie formularzy**\n   • document.forms[0] - Pobierz pierwszy formularz\n   • form.checkValidity() - Sprawdź walidację formularza\n   • input.value = "test" - Ustaw wartości inputów\n   • form.submit() - Wyślij formularze\n\n⚡ Praktyczne ćwiczenie:\n1. Otwórz stronę z formularzem\n2. Naciśnij F12 → zakładka Console\n3. Wpisz: document.querySelector("input")\n4. Spróbuj: $0.value = "dane testowe"\n5. Testuj: document.forms[0].checkValidity()\n\n🐛 Typowe wzorce błędów:\n• "Cannot read property" - Sprawdź czy element istnieje\n• "Not defined" - Zmienna/funkcja nie istnieje\n• "Permission denied" - CORS lub ograniczenie bezpieczeństwa\n\n💡 Pro tip dla testerów:\nUżywaj Console do testowania funkcji JavaScript przed pisaniem skryptów automatyzacji. Idealne do eksperymentowania z selektorami i interakcjami formularzy!',
      
      'learn.course.network.title': 'Panel Sieci - Analiza HTTP',
      'learn.course.network.description': 'Opanuj debugowanie sieci, testowanie API i optymalizację wydajności z zaawansowanymi technikami monitorowania.',
      'learn.course.network.content': '🌐 Panel Sieci - Twoje Narzędzie Detektywistyczne HTTP\n\nPanel Sieci jest kluczowy dla zrozumienia komunikacji aplikacji webowych, debugowania problemów API i optymalizacji wydajności.\n\n🎯 Podstawowa analiza sieci:\n• Monitorowanie żądań/odpowiedzi HTTP\n• Debugowanie i testowanie API\n• Identyfikacja wąskich gardeł wydajności\n• Analiza nagłówków bezpieczeństwa\n• Rozwiązywanie problemów CORS\n• Monitorowanie WebSocket\n• Debugowanie Service Worker\n\n🛠️ Zaawansowane funkcje sieci:\n\n1. **Analiza żądań**\n   • Kody statusu (200, 404, 500, itp.)\n   • Metody HTTP (GET, POST, PUT, DELETE)\n   • Nagłówki (Żądanie/Odpowiedź)\n   • Ciasteczka i uwierzytelnianie\n   • Parametry zapytań\n   • Treści żądań/odpowiedzi\n\n2. **Monitorowanie wydajności**\n   • Wykresy wodospadowe\n   • Analiza czasów\n   • Optymalizacja ładowania zasobów\n   • Analiza ścieżki krytycznej\n   • Analiza wielkości pakietów\n   • Wydajność CDN\n\n3. **Narzędzia debugowania**\n   • Analiza nieudanych żądań\n   • Debugowanie błędów CORS\n   • Problemy uwierzytelniania\n   • Wykrywanie ograniczeń szybkości\n   • Rozwiązywanie problemów timeout\n   • Problemy certyfikatów SSL/TLS\n\n4. **Możliwości testowe**\n   • Kopiowanie jako komenda cURL\n   • Kopiowanie jako kod fetch()\n   • Edycja i ponowne wysyłanie żądań\n   • Blokowanie żądań\n   • Symulacja throttling\n   • Testowanie trybu offline\n\nOpanuj debugowanie sieci i rozwiążesz każdy problem aplikacji webowej!',
      
      'learn.course.sources.title': 'Panel Sources - Debugowanie Kodu',
      'learn.course.sources.description': 'Opanuj debugowanie JavaScript z breakpointami, step-through debugging i analizą kodu źródłowego.',
      'learn.course.sources.content': '🔍 Panel Sources - Zaawansowane Debugowanie JavaScript\n\nPanel Sources to Twoje najpotężniejsze narzędzie do debugowania kodu JavaScript, ustawiania breakpointów i zrozumienia przepływu wykonania kodu.\n\n🎯 Podstawowe funkcje debugowania:\n• Zarządzanie breakpointami\n• Step-through debugging\n• Inspekcja zmiennych\n• Analiza stosu wywołań\n• Edycja kodu źródłowego\n• Wyrażenia watch\n• Breakpointy warunkowe\n\nOpanuj Panel Sources i będziesz debugować każdy problem JavaScript z pewnością!',
      
      'learn.course.application.title': 'Panel Application - Storage i PWA',
      'learn.course.application.description': 'Opanuj zarządzanie storage przeglądarki, service workers i techniki debugowania Progressive Web App.',
      'learn.course.application.content': '🗄️ Panel Application - Zarządzanie Storage i PWA\n\nPanel Application to Twoje centrum kontroli do zarządzania storage przeglądarki, service workers i funkcjami Progressive Web App.\n\n🎯 Podstawowe funkcje aplikacji:\n• Zarządzanie Local i Session Storage\n• Inspekcja i edycja ciasteczek\n• Eksploracja bazy danych IndexedDB\n• Debugowanie Service Worker\n• Analiza manifestu PWA\n• Zarządzanie cache storage\n• Monitorowanie background sync\n\nOpanuj Panel Application i będziesz zarządzać storage każdej aplikacji webowej jak profesjonalista!',
      
      'learn.course.performance.title': 'Analiza Wydajności - Optymalizacja',
      'learn.course.performance.description': 'Opanuj zaawansowane profilowanie wydajności, analizę pamięci i techniki optymalizacji dla błyskawicznych aplikacji webowych.',
      'learn.course.performance.content': '⚡ Panel Wydajności - Mistrz Optymalizacji Prędkości\n\nPanel Wydajności to Twoje centrum dowodzenia optymalizacji wydajności, pomagające tworzyć błyskawiczne aplikacje webowe.\n\n🎯 Podstawowa analiza wydajności:\n• Profilowanie wydajności runtime\n• Wykrywanie wycieków pamięci\n• Optymalizacja wykonania JavaScript\n• Analiza wydajności renderowania\n• Metryki wydajności ładowania\n• Responsywność interakcji użytkownika\n• Monitorowanie Core Web Vitals\n\nOpanuj analizę wydajności i będziesz budować najszybsze aplikacje internetowe!',
      
      'learn.course.lighthouse.title': 'Lighthouse - Audyty Jakości',
      'learn.course.lighthouse.description': 'Opanuj automatyczne audyty z Lighthouse dla wydajności, dostępności, SEO i najlepszych praktyk.',
      'learn.course.lighthouse.content': '🔍 Lighthouse - Strażnik Jakości Twoich Stron\n\nLighthouse to automatyczne narzędzie audytowe, które pomaga poprawić jakość Twoich stron internetowych dzięki kompleksowej analizie i praktycznym rekomendacjom.\n\n🎯 Podstawowe kategorie Lighthouse:\n• Optymalizacja wydajności\n• Zgodność z dostępnością\n• Najlepsze praktyki SEO\n• Funkcje Progressive Web App\n• Jakość kodu i najlepsze praktyki\n\nOpanuj Lighthouse i będziesz budować strony, które wyróżniają się w każdej metryce jakości!',
      
      'learn.course.debugging.title': 'Zaawansowane Techniki Debugowania',
      'learn.course.debugging.description': 'Opanuj profesjonalne workflow debugowania, metodologie rozwiązywania problemów i zaawansowane techniki problem-solving.',
      'learn.course.debugging.content': '🔧 Zaawansowane Debugowanie - Profesjonalne Rozwiązywanie Problemów\n\nOpanuj sztukę systematycznego debugowania z profesjonalnymi technikami używanymi przez seniorów deweloperów i inżynierów QA.\n\n🎯 Profesjonalne podejście do debugowania:\n• Systematyczne podejście do rozwiązywania problemów\n• Metodologia analizy głównych przyczyn\n• Debugowanie oparte na hipotezach\n• Dokumentacja i dzielenie się wiedzą\n• Strategie zapobiegawcze debugowania\n\nOpanuj te zaawansowane techniki debugowania i rozwiążesz każde wyzwanie techniczne z pewnością i efektywnością!',
      
      // Difficulty levels
      'difficulty.beginner': 'Początkujący',
      'difficulty.medium': 'Średni',
      
      // Cookie Banner
      'cookie.title': '🍪 Używamy ciasteczek',
      'cookie.description': 'Używamy ciasteczek do zapamiętywania Twojego postępu w challengach, preferencji językowych i sesji logowania. Pomaga nam to zapewnić lepsze doświadczenie użytkownika.',
      'cookie.acceptAll': 'Akceptuj wszystkie',
      'cookie.onlyNecessary': 'Tylko niezbędne',
      
      // Challenge Wrapper
      'challenge.completed.title': 'Challenge Ukończony!',
      'challenge.completed.description': 'Świetna robota! Możesz spróbować ponownie lub przejść do następnego wyzwania.',
      'challenge.completed.tryAgain': 'Spróbuj Ponownie',
      'challenge.completed.resetting': 'Resetowanie...',
      'challenge.retake.title': 'Tryb Powtórki',
      'challenge.retake.description': 'Możesz spróbować tego wyzwania ponownie. Twój postęp i punkty pozostają niezmienione.',
      'challenge.retake.hide': 'Ukryj',
      'challenge.reset.confirm': 'Czy na pewno chcesz zresetować ten challenge? Stracisz postęp dla tego zadania.',
      'challenge.reset.error': 'Błąd podczas resetowania challenge. Spróbuj ponownie.',
      'QA Interactive Challenges': 'Interaktywne Wyzwania QA',
      'Test your QA skills with real-world scenarios. Find bugs, identify security issues, and improve application quality.': 'Sprawdź swoje umiejętności QA w rzeczywistych scenariuszach. Znajdź błędy, zidentyfikuj problemy bezpieczeństwa i popraw jakość aplikacji.',
      'Start Challenge': 'Rozpocznij Wyzwanie',
      'Review Challenge': 'Przejrzyj Wyzwanie',
      'Try Again': 'Spróbuj Ponownie',
      'challenges': {
        'yourProgress': 'Twój Postęp',
        'completed': 'Ukończone',
        'points': 'Punkty',
        'noMatchingChallenges': 'Brak wyzwań pasujących do wybranych filtrów.',
        'difficulty': {
          'all': 'Wszystkie Poziomy',
          'easy': 'Łatwy',
          'medium': 'Średni',
          'hard': 'Trudny'
        },
        'category': {
          'all': 'Wszystkie Kategorie'
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

declare global {
  interface Window {
    i18next: typeof i18n;
  }
}

if (typeof window !== 'undefined') {
  // Expose i18n for debugging in the browser console
  window.i18next = i18n;
}

export default i18n; 