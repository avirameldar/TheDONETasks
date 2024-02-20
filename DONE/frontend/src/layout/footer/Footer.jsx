import "./footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer'>
      <span>info@done.net {currentYear}-Aviram Eldar. All rights reserved.</span>
      <span style={{ marginLeft: '8px', display: 'flex' }}>
        <a href="mailto:done@support.com">Contect us!</a>
      </span>
    </footer>
  )
}

export default Footer

const anchorStyle = {
  padding: '0 5px',
  textDecorationLine: 'underline',
  outline: 'none',
  color: 'blue',
  border: 'none',
  backgroundColor: 'inherit',
  fontSize: ' 1.5vh',
  cursor: 'pointer',
}