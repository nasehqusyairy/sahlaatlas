import type { MetaFunction } from "react-router";
import { ContactSection } from "~/components/home/contact-section";

export const meta: MetaFunction = () => [
    { title: "Contact Us | Sahla Atlas" },
    {
        name: "description",
        content:
            "Contact Sahla Atlas for Indonesian coffee, cocoa, and tea export inquiries, business opportunities, and international commodity sourcing.",
    },
    {
        name: "keywords",
        content:
            "contact Sahla Atlas, Indonesian commodity export, coffee export inquiry, cocoa export inquiry, tea export inquiry, agricultural exporter",
    },
    {
        property: "og:title",
        content: "Contact Us | Sahla Atlas",
    },
    {
        property: "og:description",
        content:
            "Get in touch with Sahla Atlas for agricultural commodity export inquiries and business opportunities.",
    },
    {
        property: "og:type",
        content: "website",
    },
    {
        property: "og:url",
        content: "https://www.sahlaatlas.com/contact",
    },
];


export default ContactSection