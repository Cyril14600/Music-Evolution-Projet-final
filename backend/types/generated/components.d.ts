import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsEventCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_event_cards';
  info: {
    description: '';
    displayName: 'Event Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_items';
  info: {
    description: 'A single feature point with icon and text';
    displayName: 'Feature Item';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeatureSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_sections';
  info: {
    description: 'A large section with image, title, and feature list';
    displayName: 'Feature Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'sections.feature-item', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    description: 'Client review';
    displayName: 'Testimonial';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    eventContext: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.event-card': SectionsEventCard;
      'sections.feature-item': SectionsFeatureItem;
      'sections.feature-section': SectionsFeatureSection;
      'sections.testimonial': SectionsTestimonial;
    }
  }
}
