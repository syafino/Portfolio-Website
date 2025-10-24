import {
  c,
  python,
  java,
  cpp,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  edunet,
  weatherpedia,
  termpw,
  payloadmaster,
  threejs,
  mhft,
  sketcher,
  mathwork,
  CompileVortex,
  eduskill,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  { title: "C", icon: c },
  { title: "C++", icon: cpp },
  { title: "Python", icon: python },
  { title: "Java", icon: java },
];

export const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "Rect JS", icon: reactjs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Node JS", icon: nodejs },
  { name: "Three JS", icon: threejs },
  { name: "git", icon: git },
];

export const experiences = [
  {
    title: "Software Engineer & Automation Research Assistant",
    company_name: "Garg Research Group | University of Illinois at Urbana-Champaign",
    icon: eduskill, // We'll use existing icon for now
    iconBg: "#1f2937",
    date: "Sep 2025 – Current",
    points: [
      "Developed GUI and automation software for a device that accelerates cement R3 reactivity test time from 7 days to 30 minutes",
      "Integrated Raspberry Pi hardware with real-time data acquisition and visualization using React.js, Node.js, PostgreSQL, Python, Linux and MQTT",
      "Integrated WiFi connectivity from a distance by creating access point - connecting to hotspot opens a flash web page to input WiFi credentials which Raspberry Pi then connects to",
      "Automated camera capturing of diluted solution, cropping image to cuvette, and observing most significant color with OpenCV - calculations on RGB values are automated and filed in JSON for GUI display",
    ],
  },
  {
    title: "Project Backend Lead",
    company_name: "Association for Computing Machinery (ACM) | SIG Mobile",
    icon: mathwork, // We'll use existing icon for now
    iconBg: "#1e40af",
    date: "Aug 2025 - Current",
    points: [
      "Lead backend development for an 8-member team, mentoring members on Flutter, Dart, Android Studio, and widget-based UI development",
      "Designed and implemented relational database architecture for student services app at UIUC using PostgreSQL",
      "Constantly monitoring git issues and pull requests, mentoring team on best practices",
      "Mentored creation of UML/ER Diagram + system architecture design, taught RESTful API development including POST, GET, UPDATE operations",
    ],
  },
  {
    title: "Data Analysis & Finance Internship",
    company_name: "CIMB Niaga Bank",
    icon: edunet, // We'll use existing icon for now
    iconBg: "#dc2626",
    date: "Jul 2022 - Aug 2022",
    points: [
      "Analyzed large CSV datasets, identified financial trends, and created data visualizations using Excel",
      "Monitored market news to inform data-driven predictions and investment insights",
      "Analyzed market data and news to make stock predictions, which were then evaluated by the team for implementation decisions",
      "Gained hands-on experience in financial data analysis and market trend identification in Jakarta, Indonesia",
    ],
  },
];

export const projects = [
  {
    name: "WeatherPedia",
    description:
      "Web-based platform that allows users to access weather information for their location by entering it in the search field",
    tags: [
      { name: "Javascript", color: "blue-text-gradient" },
      { name: "HTML", color: "gold-text-gradient" },
      { name: "bootstrap 5.3.0", color: "pink-text-gradient" },
      { name: "Weather API by API Ninjas", color: "yellow-text-gradient" },
    ],
    image: weatherpedia,
    source_code_link: "https://github.com/lohitkolluri/WeatherPedia",
  },
  {
    name: "Terminal Like Portfolio Website",
    description:
      "A terminal themed portfolio website that allows users to type into the terminal and use commands like a real terminal.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "css", color: "gold-text-gradient" },
      { name: "Javascript", color: "pink-text-gradient" },
    ],
    image: termpw,
    source_code_link: "https://github.com/lohitkolluri/lohitkolluri.github.io",
  },
  {
    name: "Mental Health Fitness Tracker",
    description:
      "ML model that utilizes regression techniques to provide insights into mental health and make predictions based on the available data.",
    tags: [
      { name: "Machine Learning", color: "blue-text-gradient" },
      { name: "Jupyter Notebook", color: "gold-text-gradient" },
      { name: "Regression Algorithms", color: "pink-text-gradient" },
    ],
    image: mhft,
    source_code_link:
      "https://github.com/lohitkolluri/mental_health_fitness_tracker",
  },
  {
    name: "PayloadMaster",
    description:
      "Tool to automate payload creation using the Metasploit framework",
    tags: [
      { name: "shell", color: "blue-text-gradient" },
    ],
    image: payloadmaster,
    source_code_link: "https://github.com/lohitkolluri/PayloadMaster",
  },
  {
    name: "CompileVortex",
    description:
      "Tool to automate payload creation using the Metasploit framework",
    tags: [
      { name: "Javascript", color: "blue-text-gradient" },
      { name: "CSS", color: "gold-text-gradient" },
      { name: "HTML", color: "pink-text-gradient" },
    ],
    image: CompileVortex,
    source_code_link: "https://github.com/lohitkolluri/CompileVortex",
  },
  {
    name: "Sketcher",
    description:
      "Convert an input image to a pencil sketch using OpenCV and Matplotlib libraries.",
    tags: [
      { name: "OpenCV", color: "blue-text-gradient" },
      { name: "Matplotlib", color: "gold-text-gradient" },
      { name: "Python", color: "pink-text-gradient" },
    ],

    image: sketcher,
    source_code_link: "https://github.com/lohitkolluri/Image_to_Pencil_Sketch_App",
  },
];
