import type { APIRoute } from "astro";
import { llms } from "@shine/seo-core";
import { COMPANY } from "@/config/company";
import { faqs } from "@/config/faqs";
import { services } from "@/config/services";
import { siteUrl } from "@/utils/url";

export const GET: APIRoute = () => {
  const sections = [
    llms.linkList("Sitio", [
      {
        title: COMPANY.name,
        url: siteUrl("/"),
        notes: COMPANY.description,
      },
    ]),
    llms.linkList(
      "Servicios",
      services.map((s) => ({ title: s.title, notes: s.seoDescription })),
    ),
    llms.linkList(
      "Preguntas frecuentes",
      faqs.map((f) => ({ title: f.question, notes: f.answer })),
    ),
  ];

  const body = llms.llmsTxt(
    llms.header(COMPANY.name, COMPANY.description),
    sections,
  );

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
