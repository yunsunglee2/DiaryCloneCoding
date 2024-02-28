const MyButton = ({ type, text, onClick }) => {
  return (
    <button className={["mybutton", `mybutton_${type}`].join(" ")} onClick={onClick}>{text}</button>
  )
}

MyButton.defaultProps = {
  type: 'default',
}

export default MyButton;