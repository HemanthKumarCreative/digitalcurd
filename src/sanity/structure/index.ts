import type { StructureResolver } from 'sanity/structure'

const singleton = (S: Parameters<StructureResolver>[0], id: string, title: string, type: string) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(type).documentId(id).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Digital Curd Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'homePage', 'Home', 'homePage'),
              singleton(S, 'aboutPage', 'About', 'aboutPage'),
              singleton(S, 'careersPage', 'Careers', 'careersPage'),
              singleton(S, 'contactPage', 'Contact', 'contactPage'),
              singleton(S, 'blogIndex', 'Blog Index', 'blogIndex'),
              singleton(S, 'servicesIndex', 'Services Index', 'servicesIndex'),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('post').title('Blog Posts'),
      S.documentTypeListItem('job').title('Jobs'),
      S.documentTypeListItem('legalPage').title('Legal Pages'),
      S.divider(),
      singleton(S, 'siteSettings', 'Site Settings', 'siteSettings'),
    ])
