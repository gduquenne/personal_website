// Import Core
import React, { useState, useEffect } from "react";
import history from "../../../../App/index";
import { getUserInfo } from "../../../../Api/Account";
import { modifyWorkshop, addParticipant } from "../../../../Api/Workshop";

// Import Components from Material-UI
import {
  Button,
  Collapse,
  Fab,
  Fade,
  FormControl,
  Select,
} from "@material-ui/core";

import { jsPDF } from "jspdf";

// Import Styles from Material-UI
import { makeStyles } from "@material-ui/core/styles";

//Import Styles
import styleFacilitatorPanel from "../StyleSheets/styleFacilitatorPanel.jss";

// Import Icons
import { Send as SendIcon, Close as CloseIcon } from "@material-ui/icons";
import addFacilitatorIcon from "../../../../../public/img/facilitator-panel/add-facilitator.svg";
import addFacilitatorIconHover from "../../../../../public/img/facilitator-panel/add-facilitator-hover.svg";
import addParticipantIcon from "../../../../../public/img/facilitator-panel/add-participant.svg";
import addParticipantIconHover from "../../../../../public/img/facilitator-panel/add-participant-hover.svg";
import dateTimeIcon from "../../../../../public/img/facilitator-panel/calendar.svg";
import dateTimeIconHover from "../../../../../public/img/facilitator-panel/calendar-hover.svg";
import showGridLinesIcon from "../../../../../public/img/facilitator-panel/grid-lines.svg";
import showGridLinesIconHover from "../../../../../public/img/facilitator-panel/grid-lines-hover.svg";
import editWorkshopTitleIcon from "../../../../../public/img/facilitator-panel/edit-workshop.svg";
import editWorkshopTitleIconHover from "../../../../../public/img/facilitator-panel/edit-workshop-hover.svg";
import blueNoticeIcon from "../../../../../public/img/facilitator-panel/info-blue.svg";
import copyIcon from "../../../../../public/img/facilitator-panel/copy.svg";
import addIcon from "../../../../../public/img/facilitator-panel/add-plus.svg";
import convertIcon from "../../../../../public/img/facilitator-panel/convert.svg";
import convertIconHover from "../../../../../public/img/facilitator-panel/convert-hover.svg";
import saveIcon from "../../../../../public/img/facilitator-panel/saveicon.svg";
import saveIconHover from "../../../../../public/img/facilitator-panel/saveicon-hover.svg";

import {
  displayAddEmailForm,
  timeForm,
  dateForm,
  editWorkshopTitleForm,
} from "./FacilitatorPanelForms";

const useStyles = makeStyles(styleFacilitatorPanel);

const displayMenuButton = (className, startIcon, text, clbk) => {
  return (
    <Button
      color="secondary"
      className={className}
      startIcon={startIcon}
      onClick={clbk}
    >
      <span>{text}</span>
    </Button>
  );
};

const displayCloseMenuButton = (className, clbk) => {
  return (
    <div className={className} onClick={clbk}>
      <CloseIcon />
    </div>
  );
};

const FacilitatorPanel = function ({
  board,
  setOpenFacilitatorPanel,
  openFacilitatorPanel,
  workshop,
  showGrid,
}) {
  const classes = useStyles();
  const [hoverSectionText, setHoverSectionText] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [newEmailAdressValue, setNewEmailAdressValue] = useState("");
  const [workshopTitle, setWorkshopTitle] = useState("Untitled");
  const [facilitators, setFacilitators] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [owner, setOwner] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:11");
  const [selectFileFormat, setSelectFileFormat] = useState("PNG");
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const body = [
      {
        fields: ["username", "_id"],
        type: "_id",
        _id: [workshop.owner],
      },
    ];
    workshop.facilitators.forEach((fac) => {
      body[0]._id.push(fac);
    });
    workshop.participants.forEach((part) => {
      body[0]._id.push(part);
    });
    getUserInfo(body)
      .then((response) => response.json())
      .then((response) => {
        const usersInside = response.payload[0];
        setOwner(usersInside[0].username);
        let index = 1;
        const newFacilitators = [];
        workshop.facilitators.forEach(() => {
          newFacilitators.push(usersInside[index].username);
          index++;
        });
        setFacilitators(newFacilitators);
        const newParticipants = [];
        workshop.participants.forEach(() => {
          newParticipants.push(usersInside[index].username);
          index++;
        });
        setParticipants(newParticipants);
      });
  }, []);

  const displayFacilitatorBubbles = () => {
    const {
      bubble,
      addBubble,
      participantBubble,
      bubblesContainer,
      ownerBubble,
      facilitatorBubble,
    } = classes;
    const facilitatorBubbleClass = `${bubble} ${facilitatorBubble}`;
    const participantBubbleClass = `${bubble} ${participantBubble}`;
    const ownerBubbleClass = `${bubble} ${ownerBubble}`;
    return (
      <div className={bubblesContainer}>
        {owner && <Fab className={ownerBubbleClass}>{owner.slice(0, 2)}</Fab>}
        {facilitators.map((elem, index) => (
          <Fab
            key={`fabFacilitator${index}`}
            className={facilitatorBubbleClass}
          >
            {elem.slice(0, 2)}
          </Fab>
        ))}
        {participants.map((elem, index) => (
          <Fab
            key={`fabParticipants${index}`}
            className={participantBubbleClass}
          >
            {elem.slice(0, 2)}
          </Fab>
        ))}
        <Fab className={`${bubble} ${addBubble}`}>+</Fab>
      </div>
    );
  };

  const sectionButtons = (isComingSoon, text, icon, hoverIcon, clbk) => {
    let showIcon;
    if (hoverSectionText === text) {
      showIcon = <img src={`/${hoverIcon}`} />;
    } else {
      showIcon = <img src={`/${icon}`} />;
    }
    const handleMenuOpen = () => {
      if (menuOpen === text) {
        setMenuOpen(null);
      } else {
        setMenuOpen(text);
      }
    };

    return (
      <div className={classes.sectionButton}>
        <div className={classes.iconButton}>{showIcon}</div>
        <div
          className={classes.textButton}
          onMouseEnter={() => setHoverSectionText(text)}
          onMouseLeave={() => setHoverSectionText(null)}
          onClick={() => {
            handleMenuOpen();
            clbk();
          }}
        >
          {text}
        </div>
        {isComingSoon === true && (
          <span className={classes.comingSoon}>Coming Soon</span>
        )}
      </div>
    );
  };

  const handleExport = () => {
    let fileName;
    let zoomed;
    let fileFormat;

    if (isZoomed === "true") {
      zoomed = null;
    } else {
      if (selectFileFormat === "SVG") {
        zoomed = { x: -3840, y: -2160, width: 7680, height: 4320 };
      } else {
        zoomed = {
          left: 0,
          top: 0,
          width: 7680,
          height: 4320,
        };
      }
    }

    if (selectFileFormat === "SVG") {
      const svgFile = board.toSVG({ viewBox: zoomed });

      const svgBlob = new Blob([svgFile], {
        type: "image/svg+xml;charset=utf-8",
      });
      fileFormat = URL.createObjectURL(svgBlob);
      fileName = "remotings-image.svg";
    } else if (selectFileFormat === "PDF") {
      fileFormat = board.toDataURL("image/jpeg", 1.0);
    } else {
      fileFormat = board.toDataURL(zoomed);
      fileName = "remotings-image.png";
    }

    board.discardActiveObject().renderAll();

    if (selectFileFormat === "PDF") {
      const pdf = new jsPDF();
      if (isZoomed === "true") {
        pdf.addImage(fileFormat, "JPEG", 0, 0);
      } else {
        pdf.addImage(
          fileFormat,
          "JPEG",
          zoomed.left,
          zoomed.top,
          zoomed.width,
          zoomed.height
        );
      }
      pdf.save("remotings-image.pdf");
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.href = fileFormat;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  const displayMenuNotice = (text, noticeColor, icon, specificFooter) => {
    return (
      <div className={`${classes.notice} ${noticeColor}`}>
        <div className={classes.noticeIcon}>
          <img src={`/${icon}`} />
        </div>
        <div className={classes.noticeText}>{text}</div>
        {specificFooter}
      </div>
    );
  };

  const displayAddParticipantMenu = () => {
    const text = "Add Participant";
    return (
      <>
        <Collapse in={menuOpen === text}>
          <Fade in={menuOpen === text}>
            <div className={classes.menu}>
              <>
                {displayMenuNotice(
                  "Before sending invitations we recommend you to give your workshop a title.",
                  classes.blueNotice,
                  blueNoticeIcon
                )}
              </>

              <div className={classes.menuTitle}>Add participant</div>
              <div className={classes.menuButtonWrapper}>
                <div className={classes.workshopLinkPass}>
                  <p>
                    Link :&nbsp;
                    <br />
                    <span>{window.location.href}</span>
                  </p>
                </div>
                {displayMenuButton(
                  `${classes.menuButton} ${classes.lastMenuButton}`,
                  <img src={`/${copyIcon}`} />,
                  "Copy"
                )}
                {displayAddEmailForm(
                  newEmailAdressValue,
                  setNewEmailAdressValue
                )}
                {displayMenuButton(
                  `${classes.menuButton} ${classes.lastMenuButton}`,
                  <SendIcon />,
                  "Send",
                  () => {
                    const bodyEmail = [
                      {
                        workshop_id: workshop._id,
                        user_id: {
                          type: "email",
                          _id: newEmailAdressValue,
                        },
                      },
                    ];
                    addParticipant(bodyEmail);
                  }
                )}
              </div>
            </div>
          </Fade>
        </Collapse>
      </>
    );
  };

  const convertWorkshopToTemplate = () => {
    const body = [
      {
        _id: workshop._id,
        type: "template",
      },
    ];
    modifyWorkshop(body).then((response) => {
      if (response.status === 204) {
        history.push("/");
      }
    });
  };

  const collapseFadeComponent = (title, children) => {
    return (
      <Collapse in={menuOpen === title}>
        <Fade in={menuOpen === title}>
          <div className={classes.menu}>
            <div className={classes.menuTitle}>{title}</div>
            <div className={classes.menuButtonWrapper}>{children}</div>
          </div>
        </Fade>
      </Collapse>
    );
  };

  const displayAddFacilitatorMenu = () => {
    const title = "Add Facilitator";
    const children = (
      <>
        <p className={classes.menuTitle}>Current Participant List</p>
        {displayMenuButton(
          classes.menuButton,
          <img src={`/${addIcon}`} />,
          "Add"
        )}
        {displayAddEmailForm(newEmailAdressValue, setNewEmailAdressValue)}
        {displayMenuButton(
          `${classes.menuButton} ${classes.lastMenuButton}`,
          <SendIcon />,
          "Send"
        )}
      </>
    );
    return collapseFadeComponent(title, children);
  };

  const displayEditWorkshopTitleMenu = () => {
    const title = "Edit Workshop Title";
    const children = (
      <>
        {editWorkshopTitleForm(workshopTitle, setWorkshopTitle)}
        {displayMenuButton(
          `${classes.menuButton} ${classes.lastMenuButton}`,
          null,
          "Save"
        )}
      </>
    );
    return collapseFadeComponent(title, children);
  };

  const displayDateTimeMenu = () => {
    const text = "Date/Time of the Workshop";
    return (
      <Collapse in={menuOpen === text}>
        <Fade in={menuOpen === text}>
          <div className={classes.menu}>
            <div className={classes.menuTitle}>Date</div>
            <div className={classes.menuButtonWrapper}>
              {dateForm(date, setDate)}
            </div>
            <div className={classes.menuTitle}>Time</div>
            <div className={classes.menuButtonWrapper}>
              {timeForm(time, setTime)}
              {displayMenuButton(
                `${classes.menuButton} ${classes.lastMenuButton}`,
                null,
                "Save"
              )}
            </div>
          </div>
        </Fade>
      </Collapse>
    );
  };

  const handleSelectChange = (event) => {
    setSelectFileFormat(event.target.value);
  };
  const handleZoomedChange = (event) => {
    setIsZoomed(event.target.value);
  };

  const displayExportMenu = () => {
    const title = "Export to File";
    return (
      <Collapse in={menuOpen === title}>
        <Fade in={menuOpen === title}>
          <div className={classes.menu}>
            <div className={classes.menuTitle}>Select your zoom size:</div>
            <FormControl className={classes.formControl}>
              <Select native value={isZoomed} onChange={handleZoomedChange}>
                <option value={false}>Outzoomed</option>
                <option value={true}>Zoomed</option>
              </Select>
            </FormControl>
            <div className={classes.menuButtonWrapper}></div>
            <div className={classes.menuTitle}>Save as PNG or SVG:</div>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={selectFileFormat}
                onChange={handleSelectChange}
              >
                <option value="PNG">PNG</option>
                <option value="SVG">SVG</option>
                <option value="PDF">PDF</option>
              </Select>
            </FormControl>
            <div className={classes.menuButtonWrapper}>
              {displayMenuButton(
                `${classes.menuButton} ${classes.lastMenuButton}`,
                null,
                "Export",
                () => handleExport()
              )}
            </div>
          </div>
        </Fade>
      </Collapse>
    );
  };

  const displaySection = () => {
    return (
      <div className={classes.panelWrapper}>
        <div className={classes.panelTitle}>Workshop Menu</div>

        <div className={classes.sectionWrapper}>
          <div className={classes.sectionTitle}>Workshop Settings</div>

          <div className={classes.buttonWrapper}>
            {sectionButtons(
              false,
              "Add Participant",
              addParticipantIcon,
              addParticipantIconHover
            )}
            {displayAddParticipantMenu()}
            {sectionButtons(
              false,
              "Add Facilitator",
              addFacilitatorIcon,
              addFacilitatorIconHover
            )}
            {displayAddFacilitatorMenu()}
            {sectionButtons(
              false,
              "Edit Workshop Title",
              editWorkshopTitleIcon,
              editWorkshopTitleIconHover
            )}
            {displayEditWorkshopTitleMenu()}
            {sectionButtons(
              false,
              "Date/Time of the Workshop",
              dateTimeIcon,
              dateTimeIconHover
            )}
            {displayDateTimeMenu()}
          </div>
          <div className={classes.sectionTitle}>Actions</div>
          <div className={classes.buttonWrapper}>
            {sectionButtons(
              false,
              "Show Grid Lines",
              showGridLinesIcon,
              showGridLinesIconHover,
              showGrid
            )}
            {sectionButtons(
              false,
              "Convert to Template",
              convertIcon,
              convertIconHover,
              convertWorkshopToTemplate
            )}
            {sectionButtons(false, "Export to File", saveIcon, saveIconHover)}
            {displayExportMenu()}
          </div>
        </div>
      </div>
    );
  };

  const setPanelClassName = () => {
    if (openFacilitatorPanel) {
      return classes.wsMenuOpen;
    } else {
      return classes.wsMenuClose;
    }
  };

  return (
    <>
      <div className={setPanelClassName()}>
        <div className={classes.panel}>
          {displayFacilitatorBubbles()}
          {displayCloseMenuButton(classes.closeMenuButton, () =>
            setOpenFacilitatorPanel(false)
          )}
          {displaySection()}
        </div>
      </div>
    </>
  );
};

export default FacilitatorPanel;
