import { HeaderContainer, Toolbar } from './style';

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <Toolbar>

        <div style={{ flexGrow: 1 }} />
        
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;