import type { Schema, Struct } from '@strapi/strapi';

export interface DynamicImg extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_imgs';
  info: {
    displayName: 'Image Carousel';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    picture: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    specific_credits: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'dynamic.img': DynamicImg;
    }
  }
}
