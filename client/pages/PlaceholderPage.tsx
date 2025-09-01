import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="p-6">
        <Card className="max-w-md mx-auto mt-20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <Construction className="h-6 w-6 text-muted-foreground" />
            </div>
            <CardTitle>{title}</CardTitle>
            <p className="text-muted-foreground text-sm">{description}</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
             This page is under development. Continue interacting with the wizard to add content to this section.
            </p>
            <Button variant="outline" size="sm">
              Request features
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
