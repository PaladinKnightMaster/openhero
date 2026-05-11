export type AssetCategory = "desktop" | "gradient" | "minimal" | "pattern";

export interface Asset {
  id: string;
  category: AssetCategory;
  src: string;
  filename: string;
  index: number;
}

export const ASSET_CATEGORIES: AssetCategory[] = [
  "desktop",
  "gradient",
  "minimal",
  "pattern",
];

const COUNTS: Record<AssetCategory, number> = {
  desktop: 68,
  gradient: 90,
  minimal: 65,
  pattern: 49,
};

export const ASSET_TOTAL = Object.values(COUNTS).reduce((a, b) => a + b, 0);

export function getAssetCatalog(): Asset[] {
  const assets: Asset[] = [];
  for (const cat of ASSET_CATEGORIES) {
    for (let i = 1; i <= COUNTS[cat]; i++) {
      const n = String(i).padStart(2, "0");
      const filename = `${cat}-${n}.jpg`;
      assets.push({
        id: `${cat}-${n}`,
        category: cat,
        src: `/images/backgrounds/${cat}/${filename}`,
        filename,
        index: i,
      });
    }
  }
  return assets;
}
