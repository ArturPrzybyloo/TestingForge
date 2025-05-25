import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Add English translations here
      'Testing Community': 'Testing Community',
      'Discussion Forums': 'Discussion Forums',
      'Upcoming Events': 'Upcoming Events',
      'Active Members': 'Active Members',
      'Completed Challenges': 'Completed Challenges',
      'Forum Posts': 'Forum Posts',
      'QA Interactive Challenges': 'QA Interactive Challenges',
      'Improve your testing skills with interactive challenges on Testing Forge!': 'Improve your testing skills with interactive challenges on Testing Forge!',
      'Back': 'Back',
      'Filter by Difficulty:': 'Filter by Difficulty:',
      'All': 'All',
      'Beginner': 'Beginner',
      'Medium': 'Medium',
      'Start Learning →': 'Start Learning →',
      'Master Software Testing with AI': 'Master Software Testing with AI',
      'Level up your testing skills with interactive challenges, real-world scenarios, and AI-powered learning.': 'Level up your testing skills with interactive challenges, real-world scenarios, and AI-powered learning.',
      'Browse Challenges': 'Browse Challenges',
      'Get Started': 'Get Started',
      'Why Choose AI Test Forge?': 'Why Choose AI Test Forge?',
      'Real-World Challenges': 'Real-World Challenges',
      'Practice with scenarios that mirror actual testing situations.': 'Practice with scenarios that mirror actual testing situations.',
      'AI-Powered Learning': 'AI-Powered Learning',
      'Get personalized feedback and guidance from our AI assistant.': 'Get personalized feedback and guidance from our AI assistant.',
      'Active Community': 'Active Community',
      'Connect with other testers and share your experiences.': 'Connect with other testers and share your experiences.',
      'Stay Current': 'Stay Current',
      'Learn the latest testing techniques and tools.': 'Learn the latest testing techniques and tools.',
      'Try a Sample Challenge': 'Try a Sample Challenge',
      'API Testing Challenge': 'API Testing Challenge',
      'Test a REST API endpoint that manages user profiles. Your task is to:': 'Test a REST API endpoint that manages user profiles. Your task is to:',
      'Verify the GET /users endpoint returns correct user data': 'Verify the GET /users endpoint returns correct user data',
      'Test POST /users with invalid data handling': 'Test POST /users with invalid data handling',
      'Implement proper error handling': 'Implement proper error handling',
      'Try This Challenge': 'Try This Challenge',
      'Who is this for?': 'Who is this for?',
      'Beginner Testers': 'Beginner Testers',
      'Start your testing journey with fundamental concepts and basic challenges.': 'Start your testing journey with fundamental concepts and basic challenges.',
      'Mid-Level Testers': 'Mid-Level Testers',
      'Enhance your skills with advanced scenarios and automation challenges.': 'Enhance your skills with advanced scenarios and automation challenges.',
      'Senior Testers': 'Senior Testers',
      'Master AI testing and lead complex testing initiatives.': 'Master AI testing and lead complex testing initiatives.',
      'Technologies Covered': 'Technologies Covered',
      'Selenium': 'Selenium',
      'Playwright': 'Playwright',
      'Postman': 'Postman',
      'AI Testing': 'AI Testing',
      'What Our Users Say': 'What Our Users Say',
      'The AI-powered challenges helped me improve my testing skills significantly. Highly recommended!': 'The AI-powered challenges helped me improve my testing skills significantly. Highly recommended!',
      'Best platform for learning modern testing techniques. The community is incredibly supportive.': 'Best platform for learning modern testing techniques. The community is incredibly supportive.',
      'The real-world scenarios are exactly what I needed to prepare for my testing career.': 'The real-world scenarios are exactly what I needed to prepare for my testing career.',
      'Welcome to your dashboard, Tester!': 'Welcome to your dashboard, Tester!',
      'Here is a summary of your progress on Testing Forge': 'Here is a summary of your progress on Testing Forge',
      'Completed challenges': 'Completed challenges',
      'Completed courses': 'Completed courses',
      'Progress': 'Progress',
      'Recently completed challenges': 'Recently completed challenges',
      'No completed challenges yet.': 'No completed challenges yet.',
      'Challenge': 'Challenge',
      'Browse challenges': 'Browse challenges',
      'Browse courses': 'Browse courses',
      'learn.hero.title': 'DevTools Mini Course',
      'learn.hero.description': 'Master the use of browser DevTools for web development and debugging',
      'learn.startLearning': 'Start Learning →',
      'learn.backToCourses': '← Back to courses',
      'learn.moduleNotFound': 'Module not found.',
      'learn.features.title': 'Why Learn DevTools?',
      'learn.features.expert.title': 'Expert-Led Content',
      'learn.features.expert.description': 'Learn from industry experts with years of testing experience.',
      'learn.features.community.title': 'Community Support',
      'learn.features.community.description': 'Join a community of learners and get help when you need it.',
      'learn.features.practice.title': 'Hands-on Practice',
      'learn.features.practice.description': 'Apply what you learn with real-world projects and challenges.',
      'learn.course.introduction.title': 'Introduction to DevTools',
      'learn.course.introduction.description': 'Learn the basics of browser DevTools and how to access them.',
      'learn.course.introduction.content': `📗 Introduction to DevTools

Why DevTools Matter for Testers:
Browser DevTools are essential for modern web testers. They allow you to inspect the structure of a web page, debug styles and JavaScript, monitor network traffic, simulate devices, and much more. Understanding DevTools helps testers become more independent, effective, and technically capable.

Opening DevTools:
You can open DevTools in most browsers using one of the following methods:
- Keyboard Shortcuts:
  - Chrome/Edge: Ctrl + Shift + I or F12
  - macOS: Cmd + Option + I
- Right-click an element on the page and select "Inspect"
- Use the browser menu: More tools > Developer tools
Tip: You can dock DevTools to the bottom, left, right, or open it in a separate window.

DevTools Interface Overview:
Once DevTools is open, you'll see several tabs. Here are the most useful ones for testers:
1. Elements: Inspect the HTML DOM and CSS of the page. Modify styles live to test layout issues.
2. Console: Run JavaScript commands. View warnings, errors, and logs. Debug broken scripts or simulate inputs.
3. Network: Monitor HTTP requests/responses. Check for 404/500 errors or long response times.
4. Application: View cookies, localStorage, sessionStorage. Inspect service workers, cache, and web storage.
5. Sources (advanced): Debug JavaScript files with breakpoints. View loaded scripts and execution stack.

Hands-On Exercise: Modify the UI
- Right-click any element on your platform and select Inspect.
- Find the line of HTML with the text you want to change.
- Double-click the text and modify it. Try changing a button label!
- In the Styles panel on the right, change the background color of the button by editing the background-color rule.
This is only a visual change, it won't persist on refresh — but it's powerful for quick testing!

Summary:
By learning to use DevTools, testers can:
- Validate UI implementation
- Test and debug styles and JavaScript without asking developers
- Analyze page performance and inspect backend interactions
Coming up next: Elements Inspection — let's dive deeper into DOM structure and CSS debugging!`,
      'learn.course.elements.title': 'Elements Inspection',
      'learn.course.elements.description': 'Explore how to inspect and modify HTML and CSS using the Elements panel.',
      'learn.course.elements.content': `📚 Elements Inspection

What You'll Learn:
Inspecting HTML and CSS is a fundamental skill for testers. It allows you to quickly identify layout issues, verify the presence of elements, and prepare selectors for automation tools.

Inspecting Elements on the Page:
To inspect an element:
1. Right-click on any element on a webpage.
2. Choose Inspect or Inspect Element.
3. This opens the Elements tab in DevTools and highlights the DOM node.
The left pane shows the HTML structure (DOM), while the right pane displays CSS styles, computed values, and layout metrics.
Pro Tip: Hover over elements in the HTML tree to highlight them visually on the page.

Live Editing HTML & CSS:
You can edit both HTML and CSS directly within the Elements tab. This is useful for verifying UI fixes, reproducing bugs, or prototyping changes.
Editing HTML:
- Double-click any tag or attribute to edit it.
- Right-click to add or remove elements.
Editing CSS:
- Modify existing rules or add new ones in the Styles pane.
- Toggle individual properties on/off.
- View computed styles and box model to understand layout behavior.
Practice Task:
- Change a paragraph's text color.
- Add a border: 2px solid red; to a div.
- Hide an element with display: none;

Finding Selectors for Automation:
Automation tools like Selenium or Playwright rely on unique selectors to find elements.
Strategies to Find Good Selectors:
- Look for data-testid, id, or name attributes first.
- Use class names only if they are stable.
- Avoid using text content as the only selector.
How to Copy Selectors:
- Right-click on an element in the Elements tab.
- Select Copy > Copy selector or Copy > Copy XPath
Tip: Use the copied selector to test in the Console:
document.querySelector('your-selector')

Summary:
The Elements panel is your window into the DOM. With it, you can:
- Investigate layout and rendering issues
- Validate or prototype frontend changes
- Discover and verify selectors for automation
Next up: Console Usage — learn how to interact with the browser through code.`,
      'learn.course.console.title': 'Console Usage',
      'learn.course.console.description': 'Understand how to use the Console for debugging and logging.',
      'learn.course.console.content': `💾 Console Usage

Why the Console Matters for Testers:
The JavaScript console isn't just for developers. For testers, it's an incredibly powerful tool to:
- Run commands directly in the browser
- Debug application behavior
- Check for runtime errors
- Simulate user actions or backend responses
Let's explore how to use it effectively.

Opening the Console:
You can access the Console panel via:
- Shortcut: Ctrl + Shift + J (Windows/Linux) or Cmd + Option + J (macOS)
- From DevTools tabs: click on the Console tab
The console will show logs, warnings, and errors generated by the page's JavaScript.

Console Basics:
Logging Output:
Use the following commands to output information:
console.log('This is a log');
console.warn('This is a warning');
console.error('This is an error');

Variable Testing:
You can access global JavaScript variables or inspect objects:
document.title
window.location.href
document.querySelector('h1')
Try typing document.body to see the full DOM tree.

Interacting with the Page:
The console allows you to simulate changes without touching the UI:
Change text:
document.querySelector('button').innerText = 'Clicked!';
Change styles:
document.querySelector('div').style.backgroundColor = 'yellow';
Trigger clicks:
document.querySelector('#submit').click();
This is particularly useful for testing scenarios like button state, dynamic UI, or JS events.

Debugging with Console:
Reading Errors:
Errors shown in red help pinpoint the line and file where an exception occurred.
- Click on the filename to jump to the source code
- Use the stack trace to trace the origin of the issue
Testing Fixes Live:
If you suspect a variable is undefined, try defining it temporarily:
let testFlag = 'FLAG-TEST-123';
console.log(testFlag);

Summary:
The console lets you:
- Interrogate the DOM and JS runtime
- Simulate events and state changes
- Debug and experiment quickly
Next up: Network Monitoring — see how data flows between frontend and backend.`,
      'learn.course.network.title': 'Network Monitoring',
      'learn.course.network.description': 'Learn to monitor network requests and responses using the Network panel.',
      'learn.course.network.content': `The **Network panel** allows you to monitor all network activity (XHR, fetch, images, scripts, etc.).

**How to use:**
- Reload the page with the Network panel open to capture all requests.
- Click on any request to see headers, payload, and response.
- Filter requests by type (XHR, JS, CSS, etc.).
- Analyze timing (waterfall) to find slow resources.

**Use Cases:**
- Debug API calls and check request/response data
- Identify failed or slow requests
- Inspect cookies and authentication headers

**Tips:**
- Right-click a request to copy as cURL or fetch.
- Use "Preserve log" to keep requests after navigation.`,
      'learn.course.performance.title': 'Performance Analysis',
      'learn.course.performance.description': 'Discover how to analyze and improve performance using the Performance panel.',
      'learn.course.performance.content': `The **Performance panel** helps you analyze and optimize your web app's speed.

**How to use:**
- Click "Record" and interact with your page.
- Stop recording to see a breakdown of scripting, rendering, and painting.
- Identify long tasks, layout shifts, and bottlenecks.

**Key Metrics:**
- FPS (frames per second)
- CPU usage
- Network and resource loading

**Optimization Tips:**
- Minimize JavaScript execution time
- Optimize images and assets
- Reduce layout thrashing

**Pro Tip:**
- Use the "Lighthouse" panel for automated performance audits and improvement suggestions.`,
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
      'difficulty.beginner': 'Beginner',
      'difficulty.medium': 'Medium',
      'playground.title': 'Automation Playground',
      'playground.description': 'Welcome to the Automation Playground! This is your dedicated space for practicing web automation. Each module provides a controlled environment to practice different automation scenarios using tools like Selenium, Playwright, or Cypress. No flags or challenges - just pure automation practice!',
      'playground.module.dynamicUI.label': 'Dynamic UI',
      'playground.module.dynamicUI.title': 'Dynamic UI Elements',
      'playground.module.dynamicUI.description': 'Practice automating interactions with elements that appear and disappear dynamically. Perfect for learning wait strategies and element detection.',
      'playground.module.dynamicUI.tips': 'Use explicit waits to handle the element\'s visibility. Consider using polling strategies for better reliability. Handle potential StaleElementReferenceException.',
      'playground.module.dynamicUI.simulation': 'This module simulates a button that appears and disappears every 5 seconds. Practice waiting for and interacting with dynamic elements.',
      'playground.module.dynamicUI.button': 'Click Me!',
      'playground.tips': 'Tips',
      'playground.module.ajax.label': 'AJAX Requests',
      'playground.module.ajax.title': 'AJAX Requests',
      'playground.module.ajax.description': 'Train your automation skills with asynchronous data loading. Learn how to handle loading states and wait for dynamic content.',
      'playground.module.ajax.tips': 'Wait for loading spinner to disappear. Use explicit waits for the data to appear. Consider using custom wait conditions.',
      'playground.module.form.label': 'Form Validation',
      'playground.module.form.title': 'Form Validation',
      'playground.module.form.description': 'Practice automating form interactions with real-time validation. Learn how to handle input validation and form submission.',
      'playground.module.form.tips': 'Validate all fields before submitting. Handle error messages and edge cases. Test both valid and invalid inputs.',
      'playground.module.iframe.label': 'iFrames & Modals',
      'playground.module.iframe.title': 'iFrames & Modals',
      'playground.module.iframe.description': 'Master automation of elements inside iframes and modals. Learn how to switch contexts and interact with nested elements.',
      'playground.module.iframe.tips': 'Switch to the iframe context before interacting. Handle modal dialogs and overlays. Test closing and reopening modals.',
      'playground.module.table.label': 'Tables & Lists',
      'playground.module.table.title': 'Tables & Lists',
      'playground.module.table.description': 'Practice automating table interactions including sorting and data selection. Learn how to work with dynamic table data.',
      'playground.module.table.tips': 'Sort tables before selecting data. Verify table contents after actions. Handle dynamic row and column changes.',
      'playground.module.select.label': 'Select Dropdown',
      'playground.module.select.title': 'Select Dropdown',
      'playground.module.select.description': 'Practice automating selection from dropdown menus. Learn how to interact with <select> elements and verify selected values.',
      'playground.module.select.tips': 'Use selectByValue or selectByVisibleText in your automation tool. Verify the selected value after interaction. Handle dynamic dropdowns and disabled options.',
      'playground.module.choices.label': 'Checkboxes & Radios',
      'playground.module.choices.title': 'Checkboxes & Radio Buttons',
      'playground.module.choices.description': 'Practice automating selection of checkboxes and radio buttons. Learn how to check, uncheck, and verify options.',
      'playground.module.choices.tips': 'Use click or check actions for checkboxes/radios. Verify checked state after interaction. Test keyboard accessibility (Tab, Space, Arrow keys).',
      'Home': 'Home',
      'Challenges': 'Challenges',
      'Playground': 'Playground',
      'Learn': 'Learn',
      'Community': 'Community',
      'Dashboard': 'Dashboard',
      'Logout': 'Logout',
      'Login': 'Login',
      'Sign Up': 'Sign Up',
      'General Discussion': 'General Discussion',
      'Discuss anything related to software testing and quality assurance.': 'Discuss anything related to software testing and quality assurance.',
      'Test Automation': 'Test Automation',
      'Share your automation experiences and get help with your scripts.': 'Share your automation experiences and get help with your scripts.',
      'AI in Testing': 'AI in Testing',
      'Discuss the latest trends in AI-powered testing solutions.': 'Discuss the latest trends in AI-powered testing solutions.',
      'Introduction to AI Testing': 'Introduction to AI Testing',
      'Webinar': 'Webinar',
      'Hands-on Selenium Workshop': 'Hands-on Selenium Workshop',
      'Workshop': 'Workshop',
      'Testing Community Meetup': 'Testing Community Meetup',
      'Meetup': 'Meetup',
      'Join our community of testers, share knowledge, and grow together': 'Join our community of testers, share knowledge, and grow together',
      'topics': 'topics',
      'posts': 'posts',
      'Register Now': 'Register Now',
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
      'learn.minicourse.devtools.description': 'Master browser DevTools for web testing and debugging.',
      'learn.minicourse.devtools.duration': '1 hour',
      'learn.minicourse.devtools.cta': 'Start now',
      'learn.comingSoon': 'Coming soon',
    }
  },
  pl: {
    translation: {
      // Add Polish translations here
      'Testing Community': 'Społeczność Testerów',
      'Discussion Forums': 'Fora dyskusyjne',
      'Upcoming Events': 'Nadchodzące wydarzenia',
      'Active Members': 'Aktywni członkowie',
      'Completed Challenges': 'Ukończone zadania',
      'Forum Posts': 'Posty na forum',
      'QA Interactive Challenges': 'Interaktywne wyzwania QA',
      'Improve your testing skills with interactive challenges on Testing Forge!': 'Rozwijaj umiejętności testowania dzięki interaktywnym zadaniom na Testing Forge!',
      'Back': 'Wstecz',
      'Filter by Difficulty:': 'Filtruj według trudności:',
      'All': 'Wszystkie',
      'Beginner': 'Początkujący',
      'Medium': 'Średni',
      'Start Learning →': 'Rozpocznij naukę →',
      'Master Software Testing with AI': 'Opanuj testowanie oprogramowania z AI',
      'Level up your testing skills with interactive challenges, real-world scenarios, and AI-powered learning.': 'Podnieś swoje umiejętności testerskie dzięki interaktywnym zadaniom, scenariuszom z życia wziętym i nauce wspieranej przez AI.',
      'Browse Challenges': 'Przeglądaj zadania',
      'Get Started': 'Rozpocznij',
      'Why Choose AI Test Forge?': 'Dlaczego AI Test Forge?',
      'Real-World Challenges': 'Zadania z prawdziwego świata',
      'Practice with scenarios that mirror actual testing situations.': 'Ćwicz na scenariuszach odzwierciedlających rzeczywiste sytuacje testerskie.',
      'AI-Powered Learning': 'Nauka wspierana przez AI',
      'Get personalized feedback and guidance from our AI assistant.': 'Otrzymuj spersonalizowane wskazówki i feedback od asystenta AI.',
      'Active Community': 'Aktywna społeczność',
      'Connect with other testers and share your experiences.': 'Łącz się z innymi testerami i dziel się doświadczeniami.',
      'Stay Current': 'Bądź na bieżąco',
      'Learn the latest testing techniques and tools.': 'Poznawaj najnowsze techniki i narzędzia testerskie.',
      'Try a Sample Challenge': 'Wypróbuj przykładowe zadanie',
      'API Testing Challenge': 'Zadanie testowania API',
      'Test a REST API endpoint that manages user profiles. Your task is to:': 'Przetestuj endpoint REST API zarządzający profilami użytkowników. Twoje zadanie to:',
      'Verify the GET /users endpoint returns correct user data': 'Zweryfikuj, czy GET /users zwraca poprawne dane użytkownika',
      'Test POST /users with invalid data handling': 'Przetestuj POST /users pod kątem obsługi niepoprawnych danych',
      'Implement proper error handling': 'Zaimplementuj odpowiednią obsługę błędów',
      'Try This Challenge': 'Spróbuj tego zadania',
      'Who is this for?': 'Dla kogo jest ta platforma?',
      'Beginner Testers': 'Testerzy początkujący',
      'Start your testing journey with fundamental concepts and basic challenges.': 'Rozpocznij swoją przygodę z testowaniem od podstawowych pojęć i zadań.',
      'Mid-Level Testers': 'Testerzy średniozaawansowani',
      'Enhance your skills with advanced scenarios and automation challenges.': 'Rozwijaj umiejętności dzięki zaawansowanym scenariuszom i zadaniom automatyzacyjnym.',
      'Senior Testers': 'Testerzy zaawansowani',
      'Master AI testing and lead complex testing initiatives.': 'Opanuj testowanie AI i prowadź złożone inicjatywy testerskie.',
      'Technologies Covered': 'Technologie na platformie',
      'Selenium': 'Selenium',
      'Playwright': 'Playwright',
      'Postman': 'Postman',
      'AI Testing': 'Testowanie AI',
      'What Our Users Say': 'Opinie użytkowników',
      'The AI-powered challenges helped me improve my testing skills significantly. Highly recommended!': 'Wyzwania z AI znacząco poprawiły moje umiejętności testerskie. Gorąco polecam!',
      'Best platform for learning modern testing techniques. The community is incredibly supportive.': 'Najlepsza platforma do nauki nowoczesnych technik testowania. Społeczność jest bardzo pomocna.',
      'The real-world scenarios are exactly what I needed to prepare for my testing career.': 'Scenariusze z życia wzięte to dokładnie to, czego potrzebowałem, by przygotować się do pracy testera.',
      'Welcome to your dashboard, Tester!': 'Witaj na swoim panelu, Testerze!',
      'Here is a summary of your progress on Testing Forge': 'Oto podsumowanie Twoich postępów na Testing Forge',
      'Completed challenges': 'Ukończone zadania',
      'Completed courses': 'Ukończone kursy',
      'Progress': 'Postęp',
      'Recently completed challenges': 'Ostatnio ukończone zadania',
      'No completed challenges yet.': 'Nie ukończono jeszcze żadnych zadań.',
      'Challenge': 'Zadanie',
      'Browse challenges': 'Przeglądaj zadania',
      'Browse courses': 'Przeglądaj kursy',
      'learn.hero.title': 'Mini Kurs DevTools',
      'learn.hero.description': 'Opanuj używanie narzędzi deweloperskich przeglądarki do tworzenia i debugowania stron internetowych',
      'learn.startLearning': 'Rozpocznij naukę →',
      'learn.backToCourses': '← Powrót do kursów',
      'learn.moduleNotFound': 'Nie znaleziono modułu.',
      'learn.features.title': 'Dlaczego warto uczyć się DevTools?',
      'learn.features.expert.title': 'Treści od ekspertów',
      'learn.features.expert.description': 'Ucz się od ekspertów branżowych z wieloletnim doświadczeniem w testowaniu.',
      'learn.features.community.title': 'Wsparcie społeczności',
      'learn.features.community.description': 'Dołącz do społeczności uczących się i otrzymuj pomoc, gdy jej potrzebujesz.',
      'learn.features.practice.title': 'Praktyczne ćwiczenia',
      'learn.features.practice.description': 'Zastosuj zdobytą wiedzę w rzeczywistych projektach i wyzwaniach.',
      'learn.course.introduction.title': 'Wprowadzenie do DevTools',
      'learn.course.introduction.description': 'Poznaj podstawy narzędzi deweloperskich przeglądarki i sposoby ich uruchamiania.',
      'learn.course.introduction.content': `📗 Wprowadzenie do DevTools

Dlaczego DevTools są ważne dla testerów:
Narzędzia deweloperskie przeglądarki są niezbędne dla współczesnych testerów. Pozwalają na inspekcję struktury strony, debugowanie stylów i JavaScript, monitorowanie ruchu sieciowego, symulację urządzeń i wiele więcej. Zrozumienie DevTools pomaga testerom stać się bardziej niezależnymi, skutecznymi i technicznie kompetentnymi.

Otwieranie DevTools:
Możesz otworzyć DevTools w większości przeglądarek używając jednej z następujących metod:
- Skróty klawiszowe:
  - Chrome/Edge: Ctrl + Shift + I lub F12
  - macOS: Cmd + Option + I
- Kliknij prawym przyciskiem myszy na element strony i wybierz "Zbadaj"
- Użyj menu przeglądarki: Więcej narzędzi > Narzędzia deweloperskie
Wskazówka: Możesz zadokować DevTools na dole, po lewej, po prawej lub otworzyć w osobnym oknie.

Przegląd interfejsu DevTools:
Po otwarciu DevTools zobaczysz kilka zakładek. Oto najważniejsze dla testerów:
1. Elements: Inspekcja DOM HTML i CSS strony. Modyfikuj style na żywo, aby testować problemy z układem.
2. Console: Uruchamiaj komendy JavaScript. Przeglądaj ostrzeżenia, błędy i logi. Debuguj uszkodzone skrypty lub symuluj dane wejściowe.
3. Network: Monitoruj żądania/odpowiedzi HTTP. Sprawdzaj błędy 404/500 lub długie czasy odpowiedzi.
4. Application: Przeglądaj ciasteczka, localStorage, sessionStorage. Inspekcja service workers, cache i pamięci web.
5. Sources (zaawansowane): Debuguj pliki JavaScript z punktami przerwania. Przeglądaj załadowane skrypty i stos wykonania.

Ćwiczenie praktyczne: Modyfikacja interfejsu
- Kliknij prawym przyciskiem myszy na dowolny element platformy i wybierz Zbadaj.
- Znajdź linię HTML z tekstem, który chcesz zmienić.
- Kliknij dwukrotnie tekst i zmodyfikuj go. Spróbuj zmienić etykietę przycisku!
- W panelu Styles po prawej stronie zmień kolor tła przycisku, edytując regułę background-color.
To jest tylko zmiana wizualna, nie będzie zachowana po odświeżeniu — ale jest potężnym narzędziem do szybkiego testowania!

Podsumowanie:
Ucząc się używać DevTools, testerzy mogą:
- Weryfikować implementację interfejsu
- Testować i debugować style oraz JavaScript bez pomocy programistów
- Analizować wydajność strony i inspekcjonować interakcje z backendem
Następnie: Inspekcja elementów — zagłębmy się w strukturę DOM i debugowanie CSS!`,
      'learn.course.elements.title': 'Inspekcja elementów',
      'learn.course.elements.description': 'Poznaj sposoby inspekcji i modyfikacji HTML oraz CSS przy użyciu panelu Elements.',
      'learn.course.elements.content': `📚 Inspekcja elementów

Czego się nauczysz:
Inspekcja HTML i CSS to podstawowa umiejętność dla testerów. Pozwala na szybkie identyfikowanie problemów z układem, weryfikację obecności elementów i przygotowanie selektorów dla narzędzi automatyzacyjnych.

Inspekcja elementów na stronie:
Aby zbadać element:
1. Kliknij prawym przyciskiem myszy na dowolny element strony.
2. Wybierz Zbadaj lub Zbadaj element.
3. To otworzy zakładkę Elements w DevTools i podświetli węzeł DOM.
Lewy panel pokazuje strukturę HTML (DOM), podczas gdy prawy panel wyświetla style CSS, obliczone wartości i metryki układu.
Pro Tip: Najedź kursorem na elementy w drzewie HTML, aby podświetlić je wizualnie na stronie.

Edycja HTML i CSS na żywo:
Możesz edytować zarówno HTML jak i CSS bezpośrednio w zakładce Elements. Jest to przydatne do weryfikacji poprawek interfejsu, reprodukowania błędów lub prototypowania zmian.
Edycja HTML:
- Kliknij dwukrotnie dowolny tag lub atrybut, aby go edytować.
- Kliknij prawym przyciskiem myszy, aby dodać lub usunąć elementy.
Edycja CSS:
- Modyfikuj istniejące reguły lub dodawaj nowe w panelu Styles.
- Włączaj/wyłączaj pojedyncze właściwości.
- Przeglądaj obliczone style i model pudełkowy, aby zrozumieć zachowanie układu.
Zadanie praktyczne:
- Zmień kolor tekstu paragrafu.
- Dodaj obramowanie: 2px solid red; do diva.
- Ukryj element za pomocą display: none;

Znajdowanie selektorów dla automatyzacji:
Narzędzia automatyzacyjne jak Selenium czy Playwright polegają na unikalnych selektorach do znajdowania elementów.
Strategie znajdowania dobrych selektorów:
- Najpierw szukaj atrybutów data-testid, id lub name.
- Używaj nazw klas tylko jeśli są stabilne.
- Unikaj używania zawartości tekstowej jako jedynego selektora.
Jak kopiować selektory:
- Kliknij prawym przyciskiem myszy na element w zakładce Elements.
- Wybierz Kopiuj > Kopiuj selektor lub Kopiuj > Kopiuj XPath
Wskazówka: Użyj skopiowanego selektora do testowania w Konsoli:
document.querySelector('twój-selektor')

Podsumowanie:
Panel Elements to Twoje okno do DOM. Dzięki niemu możesz:
- Badać problemy z układem i renderowaniem
- Weryfikować lub prototypować zmiany frontendowe
- Odkrywać i weryfikować selektory dla automatyzacji
Następnie: Używanie konsoli — naucz się interakcji z przeglądarką przez kod.`,
      'learn.course.console.title': 'Używanie konsoli',
      'learn.course.console.description': 'Zrozum, jak używać konsoli do debugowania i logowania.',
      'learn.course.console.content': `💾 Używanie konsoli

Dlaczego konsola jest ważna dla testerów:
Konsola JavaScript to nie tylko narzędzie dla programistów. Dla testerów jest to niezwykle potężne narzędzie do:
- Uruchamiania komend bezpośrednio w przeglądarce
- Debugowania zachowania aplikacji
- Sprawdzania błędów wykonania
- Symulowania akcji użytkownika lub odpowiedzi backendu
Zbadajmy, jak używać jej efektywnie.

Otwieranie konsoli:
Możesz uzyskać dostęp do panelu konsoli przez:
- Skrót: Ctrl + Shift + J (Windows/Linux) lub Cmd + Option + J (macOS)
- Z zakładek DevTools: kliknij na zakładkę Console
Konsola pokaże logi, ostrzeżenia i błędy generowane przez JavaScript strony.

Podstawy konsoli:
Wyprowadzanie logów:
Użyj następujących komend do wyprowadzania informacji:
console.log('This is a log');
console.warn('This is a warning');
console.error('This is an error');

Testowanie zmiennych:
Możesz uzyskać dostęp do globalnych zmiennych JavaScript lub inspekcjonować obiekty:
document.title
window.location.href
document.querySelector('h1')
Spróbuj wpisać document.body, aby zobaczyć pełne drzewo DOM.

Interakcja ze stroną:
Konsola pozwala symulować zmiany bez dotykania interfejsu:
Zmiana tekstu:
document.querySelector('button').innerText = 'Kliknięto!';
Zmiana stylów:
document.querySelector('div').style.backgroundColor = 'yellow';
Wywołanie kliknięć:
document.querySelector('#submit').click();
Jest to szczególnie przydatne do testowania scenariuszy jak stan przycisku, dynamiczny interfejs lub zdarzenia JS.

Debugowanie z konsolą:
Czytanie błędów:
Błędy pokazane na czerwono pomagają zlokalizować linię i plik, w którym wystąpił wyjątek.
- Kliknij na nazwę pliku, aby przejść do kodu źródłowego
- Użyj śladu stosu, aby prześledzić pochodzenie problemu
Testowanie poprawek na żywo:
Jeśli podejrzewasz, że zmienna jest niezdefiniowana, spróbuj zdefiniować ją tymczasowo:
let testFlag = 'FLAG-TEST-123';
console.log(testFlag);

Podsumowanie:
Konsola pozwala Ci:
- Interrogować DOM i środowisko wykonawcze JS
- Symulować zdarzenia i zmiany stanu
- Debugować i eksperymentować szybko
Następnie: Monitorowanie sieci — zobacz, jak dane przepływają między frontendem a backendem.`,
      'learn.course.network.title': 'Monitorowanie sieci',
      'learn.course.network.description': 'Naucz się monitorować żądania i odpowiedzi sieciowe przy użyciu panelu Network.',
      'learn.course.network.content': `Panel **Network** pozwala monitorować całą aktywność sieciową (XHR, fetch, obrazy, skrypty, itp.).

**Jak używać:**
- Przeładuj stronę z otwartym panelem Network, aby przechwycić wszystkie żądania.
- Kliknij na dowolne żądanie, aby zobaczyć nagłówki, dane i odpowiedź.
- Filtruj żądania według typu (XHR, JS, CSS, itp.).
- Analizuj czas (waterfall), aby znaleźć wolne zasoby.

**Przypadki użycia:**
- Debugowanie wywołań API i sprawdzanie danych żądania/odpowiedzi
- Identyfikacja nieudanych lub wolnych żądań
- Inspekcja ciasteczek i nagłówków autoryzacji

**Wskazówki:**
- Kliknij prawym przyciskiem myszy na żądanie, aby skopiować jako cURL lub fetch.
- Użyj "Preserve log", aby zachować żądania po nawigacji.`,
      'learn.course.performance.title': 'Analiza wydajności',
      'learn.course.performance.description': 'Odkryj, jak analizować i poprawiać wydajność przy użyciu panelu Performance.',
      'learn.course.performance.content': `Panel **Performance** pomaga analizować i optymalizować szybkość Twojej aplikacji webowej.

**Jak używać:**
- Kliknij "Record" i wchodź w interakcję ze swoją stroną.
- Zatrzymaj nagrywanie, aby zobaczyć podział na skrypty, renderowanie i malowanie.
- Identyfikuj długie zadania, przesunięcia układu i wąskie gardła.

**Kluczowe metryki:**
- FPS (klatki na sekundę)
- Użycie CPU
- Sieć i ładowanie zasobów

**Wskazówki optymalizacji:**
- Minimalizuj czas wykonania JavaScript
- Optymalizuj obrazy i zasoby
- Zmniejsz thrashing układu

**Pro Tip:**
- Użyj panelu "Lighthouse" do automatycznych audytów wydajności i sugestii ulepszeń.`,
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
      'difficulty.beginner': 'Początkujący',
      'difficulty.medium': 'Średni',
      'playground.title': 'Playground Automatyzacji',
      'playground.description': 'Witamy w Playgroundzie Automatyzacji! To Twoje miejsce do ćwiczenia automatyzacji webowej. Każdy moduł to kontrolowane środowisko do praktyki różnych scenariuszy automatyzacji z użyciem Selenium, Playwright lub Cypress. Bez flag i wyzwań – tylko czysta praktyka!',
      'playground.module.dynamicUI.label': 'Dynamiczny UI',
      'playground.module.dynamicUI.title': 'Dynamiczne Elementy UI',
      'playground.module.dynamicUI.description': 'Ćwicz automatyzację interakcji z elementami pojawiającymi się i znikającymi dynamicznie. Idealne do nauki strategii czekania i wykrywania elementów.',
      'playground.module.dynamicUI.tips': 'Używaj jawnych waitów do obsługi widoczności elementu. Rozważ strategie pollingowe dla większej niezawodności. Obsłuż potencjalny StaleElementReferenceException.',
      'playground.module.dynamicUI.simulation': 'Ten moduł symuluje przycisk, który pojawia się i znika co 5 sekund. Ćwicz czekanie i interakcję z dynamicznymi elementami.',
      'playground.module.dynamicUI.button': 'Kliknij Mnie!',
      'playground.tips': 'Wskazówki',
      'playground.module.ajax.label': 'Żądania AJAX',
      'playground.module.ajax.title': 'Żądania AJAX',
      'playground.module.ajax.description': 'Trenuj umiejętności automatyzacji z asynchronicznym ładowaniem danych. Naucz się obsługi stanów ładowania i czekania na dynamiczne treści.',
      'playground.module.ajax.tips': 'Czekaj aż spinner ładowania zniknie. Używaj jawnych waitów na pojawienie się danych. Rozważ własne warunki oczekiwania.',
      'playground.module.form.label': 'Walidacja Formularza',
      'playground.module.form.title': 'Walidacja Formularza',
      'playground.module.form.description': 'Ćwicz automatyzację interakcji z formularzami z walidacją w czasie rzeczywistym. Naucz się obsługi walidacji i wysyłania formularzy.',
      'playground.module.form.tips': 'Waliduj wszystkie pola przed wysłaniem. Obsłuż komunikaty o błędach i przypadki brzegowe. Testuj poprawne i niepoprawne dane.',
      'playground.module.iframe.label': 'iFrame i Modale',
      'playground.module.iframe.title': 'iFrame i Modale',
      'playground.module.iframe.description': 'Opanuj automatyzację elementów wewnątrz iframe i modali. Naucz się przełączać konteksty i obsługiwać zagnieżdżone elementy.',
      'playground.module.iframe.tips': 'Przełącz kontekst na iframe przed interakcją. Obsłuż modale i nakładki. Testuj zamykanie i ponowne otwieranie modali.',
      'playground.module.table.label': 'Tabele i Listy',
      'playground.module.table.title': 'Tabele i Listy',
      'playground.module.table.description': 'Ćwicz automatyzację interakcji z tabelami, sortowanie i wybieranie danych. Naucz się obsługi dynamicznych danych w tabelach.',
      'playground.module.table.tips': 'Sortuj tabele przed wyborem danych. Weryfikuj zawartość po akcjach. Obsłuż dynamiczne wiersze i kolumny.',
      'playground.module.select.label': 'Lista rozwijana',
      'playground.module.select.title': 'Lista rozwijana',
      'playground.module.select.description': 'Ćwicz automatyzację wyboru z list rozwijanych. Naucz się obsługiwać elementy <select> i weryfikować wybrane wartości.',
      'playground.module.select.tips': 'Użyj selectByValue lub selectByVisibleText w narzędziu automatyzującym. Weryfikuj wybraną wartość po interakcji. Obsłuż dynamiczne i zablokowane opcje.',
      'playground.module.choices.label': 'Checkboxy i Radio',
      'playground.module.choices.title': 'Checkboxy i Przyciski Radio',
      'playground.module.choices.description': 'Ćwicz automatyzację zaznaczania checkboxów i przycisków radio. Naucz się zaznaczać, odznaczać i weryfikować opcje.',
      'playground.module.choices.tips': 'Używaj akcji click lub check dla checkboxów/radio. Weryfikuj stan po interakcji. Testuj dostępność z klawiatury (Tab, Spacja, Strzałki).',
      'Home': 'Strona główna',
      'Challenges': 'Wyzwania',
      'Playground': 'Playground',
      'Learn': 'Kursy',
      'Community': 'Społeczność',
      'Dashboard': 'Panel',
      'Logout': 'Wyloguj',
      'Login': 'Zaloguj',
      'Sign Up': 'Załóż konto',
      'General Discussion': 'Dyskusja ogólna',
      'Discuss anything related to software testing and quality assurance.': 'Dyskutuj o wszystkim, co związane z testowaniem oprogramowania i zapewnianiem jakości.',
      'Test Automation': 'Automatyzacja testów',
      'Share your automation experiences and get help with your scripts.': 'Podziel się doświadczeniami z automatyzacją i uzyskaj pomoc do swoich skryptów.',
      'AI in Testing': 'AI w testowaniu',
      'Discuss the latest trends in AI-powered testing solutions.': 'Dyskutuj o najnowszych trendach w testowaniu wspieranym przez AI.',
      'Introduction to AI Testing': 'Wprowadzenie do testowania AI',
      'Webinar': 'Webinar',
      'Hands-on Selenium Workshop': 'Warsztaty Selenium w praktyce',
      'Workshop': 'Warsztat',
      'Testing Community Meetup': 'Spotkanie społeczności testerów',
      'Meetup': 'Spotkanie',
      'Join our community of testers, share knowledge, and grow together': 'Dołącz do naszej społeczności testerów, dziel się wiedzą i rozwijaj razem z nami',
      'topics': 'tematy',
      'posts': 'posty',
      'Register Now': 'Zarejestruj się',
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
      'learn.minicourse.devtools.description': 'Opanuj narzędzia deweloperskie przeglądarki do testowania i debugowania.',
      'learn.minicourse.devtools.duration': '1 godzina',
      'learn.minicourse.devtools.cta': 'Zacznij teraz',
      'learn.comingSoon': 'Wkrótce dostępny',
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