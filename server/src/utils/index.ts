export const filterBlogInfo = (blogsArr: any) => {
  const filterArr = blogsArr.map((item: any) => {
    const { blogContent, TagInfo, ...rest } = item;
    const tagInfo = TagInfo.map((element: any) => {
      return element.tag[0];
    });
    return {
      ...rest,
      TagInfo: tagInfo,
      blogSnapshotContent: blogContent.slice(0, 300),
    };
  });
  return filterArr;
};

export const buildBlogDetail = (blogDetail: any) => {
  // console.log(blogDetail)
  const { TagInfo, ...rest } = blogDetail;
  const tags = TagInfo.map((element: any) => {
    const curTags = element.tag[0];
    return {
      tagId: curTags.tagId,
      label: curTags.tagName,
      value: curTags.tagColor,
    };
  });
  return {
    ...rest,
    blogTags: tags,
  };
};
