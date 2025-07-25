# LearnSpace - E-Learning Website

A responsive frontend website for an online course platform built with HTML, CSS, and vanilla JavaScript.

## Features

- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Modern E-Learning Theme**: Course marketplace with featured courses, categories, and testimonials
- **Interactive Elements**: 
  - Mobile menu toggle
  - Add to cart functionality with modal
  - Course category filtering
  - Smooth scrolling navigation
- **Course Sections**:
  - Featured Courses with ratings and pricing
  - Course Categories with icons
  - Student Testimonials
  - Statistics section
- **Two Main Pages**:
  - Homepage (`index.html`) - Overview and featured content
  - Courses Page (`courses.html`) - Full course catalog with filtering

## File Structure

```
elearning-website/
├── index.html          # Main homepage
├── courses.html        # Course catalog page
├── style.css          # Main stylesheet with responsive design
├── script.js          # JavaScript for interactivity
├── Img/               # Images and assets
│   ├── Logo.png       # Site logo
│   ├── course-placeholder.jpg  # Course thumbnails
│   ├── student1-3.jpg # Student testimonial photos
│   └── ...            # Other assets
└── README.md          # This file
```

## How to Run

### Option 1: Simple File Opening
1. Extract the zip file to your desired location
2. Open `index.html` in your web browser
3. Navigate between pages using the menu

### Option 2: Local Web Server (Recommended)
1. Extract the zip file to your desired location
2. Open terminal/command prompt in the project folder
3. Run a local server:
   - **Python**: `python -m http.server 8000` or `python3 -m http.server 8000`
   - **Node.js**: `npx serve .` or `npx http-server`
   - **PHP**: `php -S localhost:8000`
4. Open `http://localhost:8000` in your browser

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 767px and below

## Interactive Features

### Add to Cart
- Click any "Add to Cart" button on course cards
- Modal appears confirming the addition
- Course is stored in browser localStorage
- Visual feedback with button state change

### Mobile Menu
- Hamburger menu appears on mobile devices
- Slide-out navigation panel
- Touch-friendly interface

### Course Filtering
- Category buttons filter courses by topic
- Smooth animations and transitions
- Horizontal scrolling on mobile

### Navigation
- Smooth scrolling to page sections
- Sticky navigation header
- Active states and hover effects

## Customization

### Colors
The main color scheme can be modified in `style.css`:
- Primary Blue: `#0b2c5d`
- Accent Blue: `#4f93ff`
- Warning/CTA: `#feda75`

### Content
- Course information in `courses.html`
- Featured courses in `index.html`
- Testimonials and statistics can be updated in the HTML files

### Images
- Replace placeholder images in the `Img/` folder
- Update image paths in HTML files if needed
- Recommended image sizes:
  - Course thumbnails: 400x250px
  - Student photos: 120x120px
  - Logo: 200x60px

## Technical Details

- **No Framework Dependencies**: Pure HTML, CSS, and JavaScript
- **CSS Grid & Flexbox**: Modern layout techniques
- **ES6 JavaScript**: Modern JavaScript features
- **Mobile-First Design**: Responsive from the ground up
- **Accessibility**: Keyboard navigation and semantic HTML
- **Performance**: Optimized images and efficient CSS

## Future Enhancements

- User authentication system
- Shopping cart persistence
- Course video integration
- Payment processing
- User dashboard
- Course progress tracking

## Support

For any issues or questions about the website implementation, please refer to the code comments or contact the development team.

---

**Built with ❤️ for modern e-learning experiences**

