import { algoliaClient, SHOP_INDEX,} from "../config/algolia.js";

// 
export const searchShops = async (req, res) => {
  try {
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.status(200).json({
        success: true,
        shops: [],
      });
    }

    const result = await algoliaClient.searchSingleIndex({
      indexName: SHOP_INDEX,
      searchParams: {
        query,
        hitsPerPage: 20,
      },
    });

    return res.status(200).json({ success: true, shops: result.hits,});

  } catch (error) {
    // console.error("Algolia search error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to search shops",
    });
  }
};