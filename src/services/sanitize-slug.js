import slugify from 'slugify';

export default function(slug) {
  return slugify(slug, {
    remove: /[$*_+~.()'"!\:@\/\\#%^?=,`\[\];{}]/g,
    replacement: '-',
    lower: true,
  })
};

