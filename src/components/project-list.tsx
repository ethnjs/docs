import { Card, Cards } from 'fumadocs-ui/components/card';
import { getSidebarTabs } from 'fumadocs-ui/components/sidebar/tabs';
import { source } from '@/lib/source';

// Every root folder under content/docs is a project. Link each one to the page its sidebar tab opens.
export function ProjectList() {
  const projects = getSidebarTabs(source.getPageTree()).filter((tab) => !tab.unlisted);

  return (
    <Cards>
      {projects.map((project) => (
        <Card key={project.url} title={project.title} description={project.description} href={project.url} />
      ))}
    </Cards>
  );
}
