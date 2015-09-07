import QtQuick 2.3
import QtQuick.Controls 1.1
import QtQuick.Window 2.1
import QtQuick.Layouts 1.1
import QtQuick.Dialogs 1.2

import "engine.js" as GameEngine

ApplicationWindow {
    id: mainWindow
    width: 400
    height: 400
    visible: true

    Component.onCompleted: GameEngine.shuffle()

    menuBar: MenuBar {
        Menu {
            title: qsTr("&Menu")
            MenuItem {
                text: qsTr("&Shuffle")
                onTriggered: GameEngine.shuffle()
            }
            MenuItem {
                text: qsTr("E&xit")
                onTriggered: Qt.quit();
            }
        }
    }
    Component {
        id: delegate
        Rectangle {
            id: rect
            height: (parent.height/4-10)
            width: (parent.width/4-10)
            radius: 5
            visible: someText === 0 ? false : true
            color: someColor

            Text {
                id: itemText
                text: someText
                font.pointSize: (mainWindow.height + mainWindow.height)/35
                anchors.centerIn: parent
            }
            MouseArea {
                anchors.fill: parent
                onClicked: GameEngine.move(index)
            }
            Keys.onSpacePressed: GameEngine.shuffle()
        }
    }

    GridView {
        id:board
        anchors.fill: parent
        anchors.margins: 20
        interactive: false
        focus: true
        cellHeight: ((parent.height/4)-10)
        cellWidth: ((parent.width/4)-10)

        delegate: delegate
        model: model

        move: Transition {
            NumberAnimation{properties: "x,y"; duration: 200}
        }
        add: Transition {
            ParallelAnimation {
                NumberAnimation {property: "x"; from:board.width/2 - board.width/8; duration: 200}
                NumberAnimation {property: "y"; from:board.height/2 - board.height/8; duration: 200}
                NumberAnimation {property: "opacity"; from: 0; to: 1; duration: 200}
            }
        }
        remove: Transition {
            ParallelAnimation {
                NumberAnimation {properties: "x,y"; duration: 500}
                NumberAnimation {property: "opacity"; to: 0; duration: 200}
            }
        }
    }

    ListModel {
        id: model
    }

    WinWindow {
        id: winWindow
        visible: false
        newGame.onClicked: {winWindow.visible = false; GameEngine.shuffle()}
    }
}
