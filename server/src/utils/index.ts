export const filterBlogInfo = (
  blogsArr: any,
  blogTags: string,
  startPos: number,
  endPos: number,
) => {
  const tagIdArr = blogTags && blogTags.split('&&');
  let resArr = [];
  blogsArr.map((item: any) => {
    const { blogContent, TagInfo, ...rest } = item;
    const tagInfo = TagInfo.map((element: any) => {
      return element.tag[0];
    });
    const curTagId = Array.from(tagInfo, ({ tagId }) => tagId);
    const combineArr = tagIdArr && curTagId.concat(tagIdArr);
    // console.log(combineArr)
    if (!tagIdArr || combineArr.length !== new Set(combineArr).size) {
      resArr.push({
        ...rest,
        TagInfo: tagInfo,
        blogSnapshotContent: blogContent.slice(0, 300),
      });
    }
  });
  console.log(resArr);
  return { data: resArr.slice(startPos, endPos), total: resArr.length };
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
