const EmotionItem = ({
  isSelected,
  onClick,
  emotion_id,
  emotion_img,
  emotion_descript,
}) => {
  return (
    <div 
      onClick={() => onClick(emotion_id)}
      className={[
        "emotionItem",
        isSelected ? `emotionItem_on_${emotion_id}` : 'emotionItem_off'
      ].join(' ')}
    >
      <img src={emotion_img} alt={emotion_id} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
