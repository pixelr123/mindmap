import { LineType, LayoutType, TopicShapeType } from '../constants/common';
import * as Distance from '../constants/distance';
import { TopicShapeSpecialData } from '../constants/defaultstyle';


export default {
  [LineType.RIGHT_ANGLE](topicInfo) {

    const {startPoint, centerPoint, endPoints} = getImportantPoints(topicInfo);

    // draw line path
    let path = '';

    // start to center
    path += `M ${startPoint[0]} ${startPoint[1]} ${centerPoint[0]} ${centerPoint[1]} `;

    // center to each end
    endPoints.forEach((endPoint) => {
      path += `M ${centerPoint[0]} ${endPoint[1]} ${endPoint[0]} ${endPoint[1]} `
    });

    // center line
    const endPointYs = endPoints.map(endPoint => endPoint[1]);
    const minY = Math.min(...endPointYs);
    const maxY = Math.max(...endPointYs);
    if (minY !== maxY) path += `M ${centerPoint[0]} ${minY} ${centerPoint[0]} ${maxY}`;

    return path;
  },

  [LineType.ROUNDED](topicInfo) {

    const roundR = 5;

    const {startPoint, centerPoint, endPoints} = getImportantPoints(topicInfo);

    let path = '';

    // start to center
    path += `M ${startPoint[0]} ${startPoint[1]} ${centerPoint[0]} ${centerPoint[1]} `;

    // center to each end
    endPoints.forEach((endPoint) => {
      const endPointY = endPoint[1];

      if (endPointY === 0) {
        path += `M ${centerPoint[0]} ${endPointY} ${endPoint[0]} ${endPointY} `;
      }

      else {
        path += `M ${centerPoint[0]} ${endPointY + (endPointY < 0 ? + roundR : - roundR)} ` +
          `Q ${centerPoint[0]} ${endPointY} ${centerPoint[0] + roundR} ${endPointY} ` +
          `L ${endPoint[0]} ${endPointY} `;
      }
    });

    // center line
    const endPointYs = endPoints.map(endPoint => endPoint[1]);
    const minY = Math.min(...endPointYs);
    const maxY = Math.max(...endPointYs);
    if (minY !== maxY) path += `M ${centerPoint[0]} ${minY + roundR} ${centerPoint[0]} ${maxY - roundR}`;

    return path;
  }
}

function getImportantPoints(topicInfo) {
  const {position: parentPosition, boxSize, style} = topicInfo;

  const marginLeft = Distance.TopicMargin[LayoutType.LOGIC_TO_RIGHT].marginLeft;

  const halfWidth = boxSize.width / 2;

  // startPoint
  let startPoint;
  switch (style.shapeClass) {
    case TopicShapeType.PARALLELOGRAM :
    {
      const cutLength = boxSize.height / 2 / TopicShapeSpecialData.parallelogramSlope;
      startPoint = [halfWidth - cutLength, 0];
      break;
    }

    default :
    {
      startPoint = [halfWidth, 0];
    }
  }

  // centerPoint
  const centerPoint = [halfWidth + marginLeft / 2, startPoint[1]];

  // endPoints
  const endPoints = topicInfo.children.map((childInfo) => {
    const {position, boxSize, style} = childInfo;

    const fixedPosition = [position[0] - parentPosition[0], position[1] - parentPosition[1]];

    switch (style.shapeClass) {
      case TopicShapeType.PARALLELOGRAM :
      {
        const cutLength = boxSize.height / 2 / TopicShapeSpecialData.parallelogramSlope;
        return [fixedPosition[0] - boxSize.width / 2 + cutLength, fixedPosition[1]];
      }

      default :
      {
        return [fixedPosition[0] - boxSize.width / 2, fixedPosition[1]];
      }
    }

  });

  return {startPoint, centerPoint, endPoints}
}
