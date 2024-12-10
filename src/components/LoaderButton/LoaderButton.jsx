import React,{useState} from 'react'

const LoaderButton = ({isLoading, onClick, title, color, hoverColor}) => {
	const [isHovered, setIsHovered] = useState(false);
  return (
    <button
		  	disabled={isLoading} style={{ ...buttonStyle, backgroundColor: isHovered ? hoverColor : color,}}
            onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
            class="btn btn-primary fw-medium px-5"
            type="button"
          >
			{isLoading ? (
					<div className="spinner" style={spinnerStyle}></div>
				) :title}
            
          </button>
  )
}

const buttonStyle = {
	padding: '10px 20px',
	fontSize: '16px',
	borderRadius: '5px',
	border: 'none',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	// color: '#fff', // default text color
  };
  
  const spinnerStyle = {
	width: '16px',
	height: '16px',
	border: '2px solid #f3f3f3',
	borderTop: '2px solid #3498db',
	borderRadius: '50%',
	animation: 'spin 1s linear infinite',
  };
export default LoaderButton