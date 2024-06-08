import { DEFAULT_META } from "@/config/meta";
import { NextSeo } from "next-seo";
// import { useRouter } from "next/navigation";

export const PageMeta: React.FC<React.PropsWithChildren> = () => {
  //   const { pathName } = useRouter();
  // 此处可以设置根据 路由 返回特定的 metadata
  //   const pageMeta = getCustomMeta(pathname);
  // if (!pageMeta) {
  //   return null;
  // }
  const { description, image } = { ...DEFAULT_META };
  return (
    <NextSeo
      title={"pageMeta.title"}
      description={description}
      openGraph={
        image
          ? {
              images: [
                { url: image, alt: "pageMeta.title", type: "image/jpeg" },
              ],
            }
          : undefined
      }
    />
  );
};
