const MyButton = ({ type, text, onClick }) => {

  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button className={["mybutton", `mybutton_${btnType}`].join(" ")} onClick={onClick}>{text}</button>
  )
}

MyButton.defaultProps = {
  type: 'default',
}

export default MyButton;