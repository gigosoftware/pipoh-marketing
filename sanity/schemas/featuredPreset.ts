import { defineType, defineField } from "sanity";

export const featuredPreset = defineType({
  name: "featuredPreset",
  title: "Featured Preset",
  type: "document",
  description:
    "Pati cravamento · highlights a studio preset on marketing surfaces with a curator note.",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Display title (often matches the studio Preset name).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "presetId",
      type: "string",
      description:
        "Studio Preset.id · cross-system reference. Marketing fetches the preview from studio via this id.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "curatorNote",
      type: "text",
      rows: 4,
      description: "Pati voice · why this preset is featured.",
      validation: (r) => r.required().min(20),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (r) => r.required(),
    }),
  ],
});
