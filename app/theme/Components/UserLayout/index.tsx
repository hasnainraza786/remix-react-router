import MobileNavBar from "./MobileNavBar";
import SideNavBar from "./SideNavBar";
import { Container, Content, ContentContainer } from "./Styled";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutSkeleton({
  children,
}: LayoutProps): React.JSX.Element {
  return (
    <>
      <Container>
        <SideNavBar />
        <ContentContainer>
          <MobileNavBar />
          <Content>{children}</Content>
        </ContentContainer>
      </Container>
    </>
  );
}
