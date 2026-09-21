export const config = {
    // Dashboard title
    "title": "Northern Ireland road network and condition",

    // Set order of page links and display text in navigation bar
    "navigation": [
  {
    "href": "index.html",
    "text": "Home"
  },
  {
    "href": "road-length.html",
    "text": "Road length"
  },
  {
    "href": "scanner.html",
    "text": "SCANNER"
  },
  {
    "href": "surface-defects-instructed.html",
    "text": "Surface defects instructed"
  },
  {
    "href": "surface-defects-repaired.html",
    "text": "Surface defects repaired"
  },
  {
    "href": "user-notes.html",
    "text": "User Notes"
  }
],
    
    "portal_url": "https://data.nisra.gov.uk/",

    // Departmental abbreviations. See departments.js for available options
    "department": "DfI",

    // Data portal tables to use in the dashboard.
    // Re-run "src/r/data.R" script after each update to list below
    "matrix": ["RDLENGLGD", "SCANNERLGD", "SDRLGD", "SDILGD"],
    
    "rateit": "link-to-rateit"
    
}
