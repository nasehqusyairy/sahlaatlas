import type { MetaFunction } from "react-router";
import { CommoditySection } from "~/components/home/commodity-section";

export const meta: MetaFunction = () => [
    { title: "Products | Indonesian Coffee, Cocoa & Tea | Sahla Atlas" },
    {
        name: "description",
        content:
            "Explore Sahla Atlas agricultural commodities including Indonesian coffee, cocoa, and tea sourced from premium origins across Indonesia.",
    },
    {
        name: "keywords",
        content:
            "Indonesian coffee, Indonesian cocoa, Indonesian tea, coffee exporter, cocoa exporter, tea exporter, green coffee beans, cocoa powder",
    },
    {
        property: "og:title",
        content: "Products | Indonesian Coffee, Cocoa & Tea | Sahla Atlas",
    },
    {
        property: "og:description",
        content:
            "Explore premium Indonesian coffee, cocoa, and tea from selected origins across Indonesia.",
    },
    {
        property: "og:type",
        content: "website",
    },
    {
        property: "og:url",
        content: "https://www.sahlaatlas.com/products",
    },
];

export default CommoditySection