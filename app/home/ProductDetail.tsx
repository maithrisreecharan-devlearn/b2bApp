"use client";
import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";



interface Product {
  DataSheetUrl?: string;
  Description: string;
  ImagePath: string;
  Category: string;
  Manufacturer: string;
  ManufacturerPartNumber: string;
  ProductDetailUrl: string;
}

function extractProducts(json: any): Product[] {
  if (!json?.SearchResults?.Parts) return [];

  return json.SearchResults.Parts.map((p: any) => ({
    DataSheetUrl: p.DataSheetUrl || "",
    Description: p.Description,
    ImagePath: p.ImagePath,
    Category: p.Category,
    Manufacturer: p.Manufacturer,
    ManufacturerPartNumber: p.ManufacturerPartNumber,
    ProductDetailUrl: p.ProductDetailUrl,
  }));
}

export default function ProductDetail() {
        const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

   // 🔍 SEARCH FUNCTION
  const searchPart = async () => {
    if (!query) return;
    console.log("Searching for:", query);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // avoid caching issues during development
        cache: "no-store",
        body: JSON.stringify({ partNumber: query }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("API returned error:", response.status, text);
        setError(`API error ${response.status}: ${text}`);
        setProducts([]);
        return;
      } 

      const data = await response.json();

      console.log("Fetch response data:", data?.Status);
      console.log("Mouser API Response:", JSON.stringify(data, null, 2));

      setProducts(extractProducts(data));

    } catch (err: unknown) {
      console.error("Search error:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };



  return (
            <div className="w-full flex flex-col gap-6 p-6">

                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Search by symbol or part number"
                        className="w-full border border-gray-300 rounded-full py-3 pl-5 pr-12 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchPart(); // 🔥 Trigger search on Enter
                        }
                        }}
                    />

                    <button
                        onClick={searchPart} // 🔥 Trigger search on button click
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                        <FaSearch size={18} />
                    </button>
                </div>

        {/* PRODUCTS GRID – FULL WIDTH BELOW */}

        {/* show loading or error */}
        {loading && (
          <div className="text-center w-full py-4 text-gray-600">Loading results…</div>
        )}

        {error && (
          <div className="text-center w-full py-4 text-red-600">{error}</div>
        )}

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {products.map((product, index) => (
            <div
                className="border rounded-2xl shadow-md hover:shadow-lg transition p-4 bg-white w-full max-w-xs mx-auto"
                key={index}
            >
                
                {/* IMAGE */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden mb-4">
                <Image
                    src={product.ImagePath}
                    alt={product.ManufacturerPartNumber}
                    width={100}
                    height={100}
                    className="h-20 w-auto object-contain"
                />
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-bold mb-2">{product.ManufacturerPartNumber}</h2>

                {/* FIELDS */}
                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Description:</span> {product.Description}
                </p>

                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Category:</span> {product.Category}
                </p>

                <p className="text-gray-700 mb-1">
                <span className="font-semibold">Manufacturer:</span> {product.Manufacturer}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
                <a
                    href={product.DataSheetUrl || "#"}
                    target="_blank"
                    className={`flex-1 text-center py-2 rounded-lg text-white 
                    ${product.DataSheetUrl ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
                    `}
                >
                    Datasheet
                </a>

                <a
                    href={product.ProductDetailUrl}
                    target="_blank"
                    className="flex-1 text-center py-2 rounded-lg text-white bg-blue-800 hover:bg-blue-900"
                >
                    Details
                </a>
                </div>
            </div>
            ))}

        </div>

        </div>


  );
}