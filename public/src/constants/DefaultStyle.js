import * as CommonConstant from '../constants/Common';

export default {
  [CommonConstant.TOPIC_ROOT]: {
    "fontSize": "18px",
    "shapeClass": CommonConstant.SHAPE_ROUNDED_RECT,
    "lineClass": CommonConstant.LINE_ROUNDED,
    "fillColor": "#cbdefd"
  },
  [CommonConstant.TOPIC_MAIN]: {
    "fontSize": "13px",
    "shapeClass": CommonConstant.SHAPE_ROUNDED_RECT,
    "lineClass": CommonConstant.LINE_RIGHT_ANGLE,
    "fillColor": "#fef4ec"
  },
  [CommonConstant.TOPIC_SUB]: {
    "fontSize": "10px",
    "shapeClass": CommonConstant.SHAPE_ROUNDED_RECT,
    "lineClass": CommonConstant.LINE_RIGHT_ANGLE,
    "fillColor": "#fef4ec"
  },
  
  label: {
    "fontSize": "12px",
    "fillColor": "#edf9cc"
  },

  editReceiver: {
    minWidth: 100,
    minHeight: 20
  }
}