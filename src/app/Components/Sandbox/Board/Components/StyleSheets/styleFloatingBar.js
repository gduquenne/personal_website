const styleFloatingBar = () => {
  const transformScale12 = 'scale(1.2)';
  const transformScale11 = 'scale(1.1)';
  const mostUsedDisplay = 'flex';
  const positionAbsolute = 'absolute';
  const positionRelative = 'relative';
  const mostUsedTop = '55px';
  const mostUsedJustifyContent = 'space-around';
  const mostUsedBackgroundColor = '#FFFFFF';
  const mostUsedBorderRadius = '3px';
  const mostUsedPadding = '0px';
  const mostUsedZindex = '110';
  const mostUsedButtonWidth = '45px';
  const mostUsedHoverFontWeight = 'bold !important';
  const mostUsedBoxShadow = '3px 2px 9px rgba(0, 0, 0, 0.25)';
  return {
    hoverPointer: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    noSelect: {
      webkitTouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    },
    hoveredActionIcon: {
      fill: '#102542',
      '&:hover': {
        fill: '#F87060'
      }
    },
    buttonStyle: {
      width: mostUsedButtonWidth,
      height: '35px',
      color: '#102542',
      border: 'none',
      borderRadius: '0px',
      '& div': {
        color: '#102542'
      },
      '& .MuiButton-endIcon': {
        marginLeft: '0px'
      },
      '& $svgIcon': {
        '& > *': {
          fill: '#102542'
        }
      }
    },
    buttonStyleFontFamily: {
      width: mostUsedButtonWidth,
      border: 'none',
      height: '35px',
      '& div': {
        color: '#102542'
      },
      '& .MuiButton-endIcon': {
        marginLeft: 'auto'
      },
      '& .MuiButton-label': {
        marginRight: 'auto'
      }
    },
    buttonMenuClosed: {
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#F87060 !important',
        '& $svgIcon': {
          '& > *': {
            fill: '#F87060'
          }
        }
      }
    },
    buttonMenuOpen: {
      color: 'white !important',
      '& $svgIcon': {
        '& > *': {
          fill: 'white'
        }
      },
      backgroundColor: '#F87060',
      '&:hover': {
        backgroundColor: '#F87060',
        color: 'white'
      }
    },
    dropDownClose: {
      opacity: '0',
      visibility: 'hidden',
      top: '70px',
      position: positionAbsolute
    },
    textAlignSelectStyle: {
      top: mostUsedTop,
      position: positionAbsolute,
      width: '55px',
      display: mostUsedDisplay,
      padding: '4px 0px 0px 0px',
      flexDirection: 'column',
      justifyContent: mostUsedJustifyContent,
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: mostUsedBorderRadius,
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    customOption: {
      position: positionRelative,
      padding: mostUsedPadding,
      lineHeight: '20px'
    },
    moreOptionsSelectStyle: {
      top: mostUsedTop,
      left: '0px',
      position: positionAbsolute,
      width: '155px',
      display: mostUsedDisplay,
      padding: '4px 0px 4px 4px',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: mostUsedBorderRadius,
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    moreOptionsOption: {
      position: positionRelative,
      display: mostUsedDisplay,
      width: '135px',
      textTransform: 'none',
      margin: '5px 0px 5px 5px',
      lineHeight: '17px',
      '&:hover': {
        fontWeight: mostUsedHoverFontWeight,
        transform: 'scale(1.03)'
      }
    },
    moreOptionsText: {
      fontSize: '12px'
    },
    moreOptionsShortcut: {
      marginLeft: 'auto',
      color: '#102542',
      backgroundColor: '#C4C4C4',
      fontSize: '8px',
      borderRadius: '2px',
      padding: '1px'
    },
    styleDropDown: {
      top: mostUsedTop,
      position: positionAbsolute,
      width: '150px',
      display: mostUsedDisplay,
      padding: '5px 5px 0px 5px',
      flexDirection: 'row',
      justifyContent: mostUsedJustifyContent,
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: mostUsedBorderRadius,
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    textStyleOption: {
      position: positionRelative,
      padding: mostUsedPadding,
      lineHeight: '20px'
    },
    sizeSelect: {
      top: mostUsedTop,
      position: positionAbsolute,
      width: '55px',
      display: mostUsedDisplay,
      padding: mostUsedPadding,
      flexDirection: 'column',
      justifyContent: mostUsedJustifyContent,
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: mostUsedBorderRadius,
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    sizeOption: {
      position: positionRelative,
      lineHeight: '30px',
      textTransform: 'none',
      fontSize: '10px',
      '&:hover': {
        fontWeight: mostUsedHoverFontWeight,
        transform: transformScale11
      }
    },
    exportSelect: {
      top: mostUsedTop,
      left: '0px',
      position: positionAbsolute,
      width: '150px',
      display: mostUsedDisplay,
      padding: '5px',
      flexDirection: 'row',
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: mostUsedBorderRadius,
      pointerEvents: 'all',
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
      // '& >:nth-child(2)': {
      //   borderLeft: '1px solid rgba(16, 37, 66, 1)',
      //   borderRight: '1px solid rgba(16, 37, 66, 1)'
      // }
    },
    exportOption: {
      position: positionRelative,
      padding: '0px',
      fontSize: '12px',
      '&:hover': {
        fontWeight: mostUsedHoverFontWeight,
        transform: transformScale12
      },
      width: '50px '
    },
    opacityAndColorSelect: {
      position: positionAbsolute,
      width: '260px',
      display: mostUsedDisplay,
      flexDirection: 'column',
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: '2px',
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    sliderDiv: {
      position: positionRelative,
      width: '230px',
      height: '40px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '5px 5px 0px 5px',
      justifyContent: mostUsedJustifyContent
    },
    sliderLabel: {
      top: '-17px',
      position: positionRelative,
      fontSize: '10px',
      fontWeight: '400',
      textTransform: 'none',
      width: '30px',
      marginRight: 'auto',
      color: '#787878 !important'
    },
    sliderPercent: {
      top: '-34px',
      position: positionRelative,
      fontSize: '10px',
      fontWeight: '400',
      textTransform: 'none',
      width: '30px',
      marginLeft: 'auto',
      color: '#787878 !important'
    },
    colorDiv: {
      width: '260px',
      display: mostUsedDisplay,
      padding: '2px',
      flexDirection: 'row',
      justifyContent: mostUsedJustifyContent,
      flexWrap: 'wrap'
    },
    fontColorSelect: {
      top: mostUsedTop,
      position: positionAbsolute,
      width: '260px',
      left: '0px',
      display: mostUsedDisplay,
      padding: '2px',
      flexDirection: 'row',
      justifyContent: mostUsedJustifyContent,
      flexWrap: 'wrap',
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: '2px',
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    colorCircle: {
      height: '20px',
      width: '20px',
      borderRadius: '50%',
      margin: '2px',
      borderStyle: 'solid',
      borderColor: 'rgba(16, 37, 66, 1)',
      '&:hover': {
        transform: transformScale12
      }
    },
    dashAndColorSelect: {
      position: positionAbsolute,
      width: '260px',
      display: mostUsedDisplay,
      flexDirection: 'column',
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: '2px',
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    dashDiv: {
      position: positionRelative,
      display: 'flex',
      flexDirection: 'row',
      width: '180px',
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'space-between'
    },
    dash: {
      fontSize: '2.3em',
      '&:hover': {
        transform: transformScale11
      }
    },
    groupIcon: {
      '&:hover': {
        transform: transformScale11
      }
    },
    selectedDash: {
      '&:hover': {
        transform: transformScale11
      },
      fontSize: '2.3em',
      '& > *': {
        fill: '#F87060'
      },
      '& > line': {
        stroke: '#F87060'
      }
    },
    aspectRatioSelect: {
      top: mostUsedTop,
      position: positionAbsolute,
      width: '253px',
      left: '0px',
      display: mostUsedDisplay,
      padding: '8px 8px',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: '2px',
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    aspectRatio: {
      margin: '6px 4px',
      fontSize: '13px',
      width: '69px',
      '&:hover': {
        fontWeight: mostUsedHoverFontWeight,
        transform: transformScale11
      }
    },
    emojiSelect: {
      overflowY: 'scroll',
      height: '207px',
      top: mostUsedTop,
      position: positionAbsolute,
      width: '140px',
      left: '0px',
      display: mostUsedDisplay,
      padding: '5px 0px 5px 5px',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: '2px',
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    emojiIcon: {
      margin: '1px 10px 1px 10px ',
      fontSize: '22px',
      '&:hover': {
        transform: transformScale12
      }
    },
    fontFamilySelectStyle: {
      top: mostUsedTop,
      position: positionAbsolute,
      width: '130px',
      display: mostUsedDisplay,
      padding: '4px 0px 0px 0px',
      flexDirection: 'column',
      justifyContent: mostUsedJustifyContent,
      backgroundColor: mostUsedBackgroundColor,
      borderRadius: mostUsedBorderRadius,
      zIndex: mostUsedZindex,
      boxShadow: mostUsedBoxShadow
    },
    fontFamilyOptionsStyle: {
      position: positionRelative,
      padding: mostUsedPadding,
      lineHeight: '30px',
      '&:hover': {
        transform: transformScale11
      }
    },
    svgIcon: {
      pointerEvents: 'none'
    },
    hoverStyleSvg: {
      '&:hover': {
        transform: transformScale11,
        '& > *': {
          fillOpacity: '1'
        }
      }
    },
    selectedStyleSvg: {
      '&:hover': {
        transform: transformScale11
      },
      '& > *': {
        fillOpacity: '1',
        fill: '#F87060'
      }
    },
    hoverAlignSvg: {
      '&:hover': {
        transform: transformScale11,
        '& > *': {
          stroke: 'black'
        }
      }
    },
    selectedAlignSvg: {
      '&:hover': {
        transform: transformScale11
      },
      '& > *': {
        fill: '#F87060'
      }
    },
    checkSvg: {
      position: 'absolute',
      top: '10px',
      fontSize: '12px'
    },
    utilityIcon: {
      '&:hover': {
        '& > rect': {
          stroke: '#F87060'
        },
        '& > path': {
          fill: '#F87060'
        },
        '& g': {
          '& > path': {
            fill: '#F87060'
          }
        }
      }
    }
  };
};

export default styleFloatingBar;
