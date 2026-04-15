import requests
from bs4 import BeautifulSoup
from fpdf import FPDF

# 1. Configuration & Content
html_content = """[Paste your HTML code here]"""
urls = [
    "https://skphd.medium.com/data-engineering-interview-questions-and-answers-0261f7763ff8",
    "https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-libraries.html",
    "https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/operators/glue.html"
]

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.set_text_color(212, 175, 55) # Adhvaga Gold
        self.cell(0, 10, 'Cloud Architecture & Data Engineering Notes', 0, 1, 'C')
        self.ln(5)

# 2. Extract Data from URLs
def get_site_text(url):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Grab the title and the first few paragraphs
        title = soup.find('h1').text.strip() if soup.find('h1') else "Resource Note"
        paragraphs = soup.find_all('p')
        content = " ".join([p.text for p in paragraphs[:5]]) # Get top 5 paragraphs
        return title, content
    except:
        return "Link Error", "Could not retrieve content."

# 3. Build the PDF
pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
pdf.set_font("Arial", size=12)

for url in urls:
    title, text = get_site_text(url)
    
    # Add Title
    pdf.set_text_color(212, 175, 55)
    pdf.set_font("Arial", 'B', 14)
    pdf.multi_cell(0, 10, txt=f"Source: {title}")
    
    # Add Text
    pdf.set_text_color(200, 200, 200)
    pdf.set_font("Arial", size=11)
    pdf.multi_cell(0, 8, txt=text)
    pdf.ln(10)

pdf.output("Cloud_Architecture_Notes.pdf")
print("PDF created successfully!")