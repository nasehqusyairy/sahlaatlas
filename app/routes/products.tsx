import { ArticleHeader } from "~/components/article-header";
import { CommoditySection } from "~/components/home/commodity-section";

export default function Products() {
    return (
        <>
            <ArticleHeader
                hideCover
                hideMeta
                article={{
                    title: 'Our Products',
                    author: 'Sahla Atlas'
                }}
            />
            <CommoditySection hideTitle />
        </>
    )
}