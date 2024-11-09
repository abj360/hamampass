import Footer from "@/components/commons/footer";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
