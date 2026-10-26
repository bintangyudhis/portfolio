#!/usr/bin/env python3
"""English version of Bintang Yudhistira's CV, translated faithfully from
his own Indonesian CV (CV-ATS-BintangYudhistira.pdf, provided 2026-10-27).
Simple ATS-friendly layout, no long dashes anywhere."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
                                HRFlowable)

OUT = "/tmp/cv-en.pdf"

name = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=20,
                      leading=24, alignment=TA_CENTER, spaceAfter=2)
contact = ParagraphStyle("contact", fontName="Helvetica", fontSize=9.5,
                         leading=13, alignment=TA_CENTER,
                         textColor="#333333", spaceAfter=4)
h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=11.5,
                    leading=14, spaceBefore=11, spaceAfter=4,
                    textColor="#1a1a2e")
body = ParagraphStyle("body", fontName="Helvetica", fontSize=9.8,
                      leading=13.6, spaceAfter=3)
entry = ParagraphStyle("entry", fontName="Helvetica", fontSize=10.2,
                       leading=13.8, spaceBefore=5, spaceAfter=1)
bullet = ParagraphStyle("bullet", fontName="Helvetica", fontSize=9.8,
                        leading=13.4, leftIndent=11, bulletIndent=2,
                        spaceAfter=1.5)


def section(title):
    return [Paragraph(title.upper(), h2),
            HRFlowable(width="100%", thickness=0.7, color="#5B5BD6",
                       spaceAfter=5)]


def entry_line(org_role, period):
    return Paragraph(f"<b>{org_role}</b> | {period}", entry)


story = []
story.append(Paragraph("Bintang Yudhistira", name))
story.append(Paragraph(
    "yudhiskuliah36@gmail.com | 082313114052 | yudhis_gaiden | "
    "Salem, Brebes, Central Java, Indonesia", contact))
story.append(Paragraph(
    "My name is Bintang Yudhistira, an undergraduate student of Informatics "
    "Engineering at Telkom University. I have experience in partnerships, "
    "public speaking, and several fields of technology. I am interested in "
    "Web Development, Finance, and AI, and I follow developments in the "
    "technology and finance industries such as Web3 and Cryptocurrency. I "
    "am able to work professionally both in a team and individually.", body))

story += section("Education")
story.append(entry_line("Telkom University, B.S. Informatics Engineering",
                        "2023 - Present"))
story.append(entry_line("SMAN 1 Salem, Science Major", "2020 - 2023"))

story += section("Organizational Experience and Training")
story.append(entry_line(
    "Telkom University, Informatics Student Association (HMIF), "
    "Staff of the Human Resource Development Department", "2023 - 2024"))
for b in [
    "Chaired the Internship work program of the association.",
    "Coordinated the event division of the Responsif work program.",
    "Served as secretary for several work programs.",
    "Acted as public relations and partnership liaison for the UpgradeIF "
    "work program.",
    "Moderator and Master of Ceremonies (MC) at the Final Project "
    "Socialization and Guest Lecture events.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))
story.append(entry_line(
    "Telkom University, SIRCLE Research and Development, "
    "Member of the Software Engineering Division", "2023 - 2024"))
story.append(Paragraph(
    "Attended weekly studies, training sessions, and a Mobile Development "
    "bootcamp using Flutter.", bullet, bulletText="-"))
story.append(entry_line(
    "Telkom University, Google Developer Groups, Active Community Member",
    "2023 - Present"))
story.append(Paragraph(
    "Actively participates in the community's events and work programs.",
    bullet, bulletText="-"))
story.append(entry_line(
    "Telkom University, Student Election (Pemira) Committee, "
    "External Planning Bureau Staff", "2025 - 2026"))
story.append(entry_line(
    "Telkom University, Informatics Study Program Event Committees",
    "2024 - 2025"))
for b in [
    "Equipment coordinator for the Study Program Orientation and Campus "
    "Introduction (OSPEK) event.",
    "Actively prepared the election series for Student President and the "
    "Student Representative Council.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))
story.append(entry_line(
    "Arya Privat Training Institute (External), Student", "2021 - 2022"))
story.append(Paragraph("Attended Microsoft Office training and courses.",
                       bullet, bulletText="-"))
story.append(entry_line("Build With Angga (External), Student", "Flexible"))
for b in [
    "Attended a website development class using Laravel and Filament.",
    "Attended several basic data analyst and data scientist classes.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))

story += section("Work and Internship Experience")
story.append(entry_line(
    "Telkom University, Faculty of Informatics, Practicum Assistant",
    "September 2024 - January 2025"))
for b in [
    "Explained practicum modules to students.",
    "Processed student data covering modules, attendance, and assignment "
    "grading.",
    "Created and graded pretest questions, journals, and midterm and final "
    "exam questions.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))
story.append(entry_line(
    "Purwokerto District Court, PTIP Division Intern",
    "July 2025 - August 2025"))
for b in [
    "Built a chatbot to send broadcast messages automatically using "
    "Node.js.",
    "Designed guidebooks and instruction manuals.",
    "Created and edited several social media video contents.",
    "Helped operate OBS with Zoom during online court sessions.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))
story.append(entry_line(
    "Anime Lovers Indonesia Community, Community Admin", "2020 - 2022"))
for b in [
    "Established community rules and policies.",
    "Managed and shared event information for the community.",
    "Created and shared broadcasts and helped answer member questions.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))

story += section("Projects")
for b in [
    "Built a web-based warehouse management application using Java.",
    "Designed a game top-up application using Figma.",
    "Designed a marketplace website for a competition using Figma.",
    "Built an E-Menu website using Laravel with Filament.",
    "Scraped data from the Google Play Store for modeling purposes.",
    "Built CNN, ViT, and Hybrid CNN-ViT models to classify Indonesian "
    "Batik patterns.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))

story += section("Scientific Publications")
for b in [
    "Sentiment Analysis of the My TelU application using the Support "
    "Vector Machine (SVM) algorithm.",
    "Comparative Study of CNN, Vision Transformer, and Hybrid CNN-ViT "
    "Models for Indonesian Batik Pattern Classification, published at "
    "CENTIVE (Conference on Electrical Network, Technology, and "
    "Innovation), 2025.",
    "Design and Build of an Internet of Things (IoT) Based Automatic "
    "Clothes Drying Rack Prototype with a Raindrop Sensor and Light "
    "Dependent Resistor (LDR) at Leon Laundry, published in Jurnal "
    "Teknologika (Vol. 15, No. 2), 2025.",
]:
    story.append(Paragraph(b, bullet, bulletText="-"))

story += section("Skills")
story.append(Paragraph(
    "<b>Languages:</b> Indonesian, English.<br/>"
    "<b>Programming Languages:</b> Python, C++, Java, JavaScript, PHP, "
    "Go.<br/>"
    "<b>Technical Skills:</b> Web Developer, Database Management, UI/UX "
    "Design, Microsoft Office, Photo and Video Editing.<br/>"
    "<b>Tools and Platforms:</b> Microsoft Word, Microsoft Excel, "
    "Microsoft PowerPoint, Canva, Visual Studio Code, NetBeans, TablePlus, "
    "Git and GitHub, CapCut, Figma, XAMPP.<br/>"
    "<b>Soft Skills:</b> Project Management, Copywriting, Public "
    "Speaking, Planning, Leadership, Communication, Teamwork.", body))

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=18 * mm,
                        rightMargin=18 * mm, topMargin=14 * mm,
                        bottomMargin=14 * mm,
                        title="CV - Bintang Yudhistira (English)",
                        author="Bintang Yudhistira")
doc.build(story)
print("written", OUT)
