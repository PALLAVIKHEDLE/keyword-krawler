import subprocess

url = "https://amazon.com/"
command = f"lighthouse {url} --enable-error-reporting --output json --output-path report.json --only-categories=seo"

subprocess.run(command, shell=True)

import json

with open("report.json") as report_file:
    report_data = json.load(report_file)

# Extract SEO-related information from the report_data
seo_info = report_data["audits"]["crawlable-anchors"]
print('Crawlable' if seo_info['title'] == 'Links are not crawlable' else 'Not Crawlable')
