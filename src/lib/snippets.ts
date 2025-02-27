
export type SnippetLanguage = "html" | "css" | "javascript" | "react" | "vue" | "angular" | "tailwind";

export type SnippetCategory = 
  | "layout" 
  | "components" 
  | "forms" 
  | "navigation" 
  | "cards" 
  | "buttons" 
  | "animations"
  | "effects";

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: SnippetLanguage;
  category: SnippetCategory;
  authorId?: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
}

// Mock data for snippets
export const mockSnippets: Snippet[] = [
  {
    id: "1",
    title: "Responsive Card Grid",
    description: "A clean, responsive card grid layout with hover effects.",
    code: `<div class="card-grid">
  <div class="card">
    <img src="image1.jpg" alt="Card Image" class="card-img">
    <div class="card-content">
      <h3 class="card-title">Card Title</h3>
      <p class="card-text">Card description goes here.</p>
      <button class="card-btn">Learn More</button>
    </div>
  </div>
  <!-- More cards here -->
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }
  
  .card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
  
  .card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }
  
  .card-text {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .card-btn {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .card-btn:hover {
    background: #2563eb;
  }
</style>`,
    language: "html",
    category: "cards",
    authorName: "Alex Chen",
    createdAt: "2023-05-15T14:22:10Z",
    updatedAt: "2023-05-15T14:22:10Z",
    likes: 128,
    views: 2456,
  },
  {
    id: "2",
    title: "Modern Navigation Bar",
    description: "A sleek, responsive navigation bar with dropdown support.",
    code: `<nav class="navbar">
  <div class="navbar-logo">
    <a href="#">Brand</a>
  </div>
  
  <button class="navbar-toggle" aria-label="Toggle navigation">
    <span></span><span></span><span></span>
  </button>
  
  <div class="navbar-menu">
    <a href="#" class="active">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Portfolio</a>
    <a href="#">Contact</a>
  </div>
</nav>

<script>
  document.querySelector('.navbar-toggle').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('active');
    this.classList.toggle('active');
  });
</script>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    position: relative;
  }
  
  .navbar-logo a {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: #111;
  }
  
  .navbar-menu {
    display: flex;
    gap: 1.5rem;
  }
  
  .navbar-menu a {
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: color 0.2s ease;
    padding: 0.5rem 0;
    position: relative;
  }
  
  .navbar-menu a:hover, .navbar-menu a.active {
    color: #000;
  }
  
  .navbar-menu a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #000;
    transition: width 0.3s ease;
  }
  
  .navbar-menu a:hover::after, .navbar-menu a.active::after {
    width: 100%;
  }
  
  .navbar-toggle {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
  }
  
  .navbar-toggle span {
    display: block;
    width: 25px;
    height: 2px;
    background-color: #333;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .navbar-toggle {
      display: flex;
    }
    
    .navbar-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background-color: white;
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);
      padding: 1rem;
      gap: 0.5rem;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .navbar-menu.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .navbar-toggle.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .navbar-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .navbar-toggle.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
</style>`,
    language: "html",
    category: "navigation",
    authorName: "Sofia Rodriguez",
    createdAt: "2023-06-22T09:14:35Z",
    updatedAt: "2023-06-25T11:30:45Z",
    likes: 95,
    views: 1873,
  },
  {
    id: "3",
    title: "Custom Checkbox & Radio Styles",
    description: "Beautiful custom styled checkboxes and radio buttons.",
    code: `<div class="custom-form">
  <label class="custom-checkbox">
    <input type="checkbox" name="checkbox1">
    <span class="checkmark"></span>
    <span class="label-text">Custom Checkbox</span>
  </label>
  
  <label class="custom-checkbox">
    <input type="checkbox" name="checkbox2" checked>
    <span class="checkmark"></span>
    <span class="label-text">Checked by Default</span>
  </label>
  
  <div class="radio-group">
    <label class="custom-radio">
      <input type="radio" name="radio-group" value="option1">
      <span class="radio-mark"></span>
      <span class="label-text">Option One</span>
    </label>
    
    <label class="custom-radio">
      <input type="radio" name="radio-group" value="option2" checked>
      <span class="radio-mark"></span>
      <span class="label-text">Option Two</span>
    </label>
    
    <label class="custom-radio">
      <input type="radio" name="radio-group" value="option3">
      <span class="radio-mark"></span>
      <span class="label-text">Option Three</span>
    </label>
  </div>
</div>

<style>
  .custom-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 2rem auto;
  }
  
  .custom-checkbox, .custom-radio {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    user-select: none;
  }
  
  .custom-checkbox input, .custom-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .checkmark, .radio-mark {
    position: absolute;
    left: 0;
    height: 24px;
    width: 24px;
    border-radius: 4px;
    border: 2px solid #ccc;
    transition: all 0.2s ease;
  }
  
  .radio-mark {
    border-radius: 50%;
  }
  
  .custom-checkbox:hover input ~ .checkmark,
  .custom-radio:hover input ~ .radio-mark {
    border-color: #b3b3b3;
  }
  
  .custom-checkbox input:checked ~ .checkmark,
  .custom-radio input:checked ~ .radio-mark {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }
  
  .checkmark:after, .radio-mark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  .custom-checkbox input:checked ~ .checkmark:after,
  .custom-radio input:checked ~ .radio-mark:after {
    display: block;
  }
  
  .custom-checkbox .checkmark:after {
    left: 9px;
    top: 5px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  .custom-radio .radio-mark:after {
    left: 7px;
    top: 7px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
  }
  
  .label-text {
    font-size: 16px;
    color: #333;
  }
  
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
</style>`,
    language: "html",
    category: "forms",
    authorName: "Mike Johnson",
    createdAt: "2023-07-11T16:45:23Z",
    updatedAt: "2023-07-14T10:12:18Z",
    likes: 84,
    views: 1405,
  },
  {
    id: "4",
    title: "Smooth Loading Animation",
    description: "A set of elegant loading indicators with pure CSS.",
    code: `<div class="loader-container">
  <div class="loader loader-pulse" title="Pulse Loader"></div>
  <div class="loader loader-spinner" title="Spinner Loader"></div>
  <div class="loader loader-dots" title="Dots Loader"></div>
</div>

<style>
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    margin: 2rem auto;
    max-width: 600px;
  }
  
  .loader {
    position: relative;
  }
  
  /* Pulse loader */
  .loader-pulse {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3b82f6;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
  
  /* Spinner loader */
  .loader-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(59, 130, 246, 0.3);
    border-radius: 50%;
    border-top-color: #3b82f6;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* Dots loader */
  .loader-dots {
    display: flex;
    gap: 8px;
  }
  
  .loader-dots::before,
  .loader-dots::after,
  .loader-dots {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #3b82f6;
    animation: dots 1.4s ease-in-out infinite;
  }
  
  .loader-dots::before {
    animation-delay: -0.32s;
  }
  
  .loader-dots {
    animation-delay: -0.16s;
  }
  
  @keyframes dots {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
</style>`,
    language: "html",
    category: "animations",
    authorName: "Emily Taylor",
    createdAt: "2023-08-03T21:10:59Z",
    updatedAt: "2023-08-03T21:10:59Z",
    likes: 112,
    views: 1929,
  },
  {
    id: "5",
    title: "Gradient Button with Hover Effect",
    description: "Eye-catching gradient buttons with smooth hover transitions.",
    code: `<div class="button-container">
  <button class="gradient-button primary">Primary Button</button>
  <button class="gradient-button secondary">Secondary Button</button>
  <button class="gradient-button success">Success Button</button>
</div>

<style>
  .button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 2rem;
    justify-content: center;
  }
  
  .gradient-button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: transform 0.3s ease;
  }
  
  .gradient-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: 200% 200%;
    background-position: 0% 0%;
    z-index: -1;
    transition: all 0.5s ease;
  }
  
  .gradient-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(0,0,0,0.15), 0 5px 5px rgba(0,0,0,0.12);
  }
  
  .gradient-button:hover::before {
    background-position: 100% 100%;
  }
  
  .gradient-button:active {
    transform: translateY(0);
  }
  
  .primary::before {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  }
  
  .secondary::before {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  }
  
  .success::before {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  }
</style>`,
    language: "html",
    category: "buttons",
    authorName: "Chris Watson",
    createdAt: "2023-09-17T08:34:21Z",
    updatedAt: "2023-09-18T17:22:11Z",
    likes: 76,
    views: 1198,
  }
];

// Utility function to get snippets by category
export function getSnippetsByCategory(category: SnippetCategory): Snippet[] {
  return mockSnippets.filter(snippet => snippet.category === category);
}

// Utility function to get all categories with count
export function getCategoriesWithCount(): {category: SnippetCategory, count: number}[] {
  const categories = mockSnippets.reduce((acc, snippet) => {
    const existingCategory = acc.find(c => c.category === snippet.category);
    if (existingCategory) {
      existingCategory.count += 1;
    } else {
      acc.push({ category: snippet.category, count: 1 });
    }
    return acc;
  }, [] as {category: SnippetCategory, count: number}[]);
  
  return categories.sort((a, b) => b.count - a.count);
}

// Utility function to search snippets
export function searchSnippets(query: string): Snippet[] {
  const lowercaseQuery = query.toLowerCase();
  return mockSnippets.filter(snippet => 
    snippet.title.toLowerCase().includes(lowercaseQuery) ||
    snippet.description.toLowerCase().includes(lowercaseQuery) ||
    snippet.code.toLowerCase().includes(lowercaseQuery)
  );
}
