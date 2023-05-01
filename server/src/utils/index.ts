export const filterBlogInfo = (blogsArr: any) => {
  const filterArr = blogsArr.map((item: any) => {
    const { blogContent, TagInfo, ...rest } = item;
    const tagInfo = TagInfo.map((element: any) => {
      return element.tag[0];
    });
    return {
      ...rest,
      TagInfo: tagInfo,
    };
  });
  return filterArr;
};
