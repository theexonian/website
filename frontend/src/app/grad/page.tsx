import SeniorGrid from "../../components/SeniorGrid"

export default function GradPage() {
  const urls:string[]=[
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_7_01_06_PM_95c867f811.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_7_00_30_PM_58d2f4b243.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_59_39_PM_21e4379e84.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_58_59_PM_856f5e5d57.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_58_16_PM_d3d1bd264b.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_57_22_PM_635f1ced0c.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_56_07_PM_6bdbbd57f6.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_55_17_PM_8c4f5fa5cb.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_54_08_PM_2b4fb4d1d8.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_53_17_PM_3e9c2be867.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_52_12_PM_1fa93e7d12.png",
    "https://d2stzhv1hip58f.cloudfront.net/Screenshot_2026_05_21_at_6_51_08_PM_cf9da5d03a.png"
  ];
  return (
    <div className="px-4 sm:px-0 py-4 w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-serif">Grad</h1>
        <SeniorGrid urls={urls} />
      </div>
    </div>
  );
}
