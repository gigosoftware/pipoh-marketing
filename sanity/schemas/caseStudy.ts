import { defineType, defineField } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required().min(3).max(140),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      type: "string",
      description: "The customer/brand the case study features.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "challenge",
      type: "text",
      rows: 3,
      description: "What the client needed to solve.",
    }),
    defineField({
      name: "outcome",
      type: "text",
      rows: 3,
      description: "What Pipoh delivered + measurable results.",
    }),
    defineField({
      name: "bodyMarkdown",
      type: "text",
      rows: 12,
      description: "Long-form narrative · markdown rendered via remark in Phase 2.",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
  ],
});
