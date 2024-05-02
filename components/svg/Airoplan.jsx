import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Airoplan = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#0064D2"
      d="M18 9.4c0 .72-.63 1.35-1.35 1.35H11.7l-4.5 7.2H5.4l2.25-7.2H2.7l-1.35 1.8H0L.9 9.4 0 6.25h1.35l1.35 1.8h4.95L5.4.85h1.8l4.5 7.2h4.95c.72 0 1.35.63 1.35 1.35Z"
    />
  </Svg>
)
export default Airoplan
