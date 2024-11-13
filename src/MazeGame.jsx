import React from "react";

const FieldStart = () => (
  <div
    className="border m-1 p-3 bg-success text-white font-weight-bold"
    style={{ width: "50px", height: "50px" }}
  >
    Н
  </div>
);

const FieldEnd = () => (
  <div
    className="border m-1 p-3 bg-danger text-white font-weight-bold"
    style={{ width: "50px", height: "50px" }}
  >
    К
  </div>
);

const FieldOpened = () => (
  <div
    className="border m-1 p-3"
    style={{ width: "50px", height: "50px" }}
  ></div>
);

const FieldClosed = () => (
  <div
    className="border m-1 p-3 bg-secondary"
    style={{ width: "50px", height: "50px" }}
  ></div>
);

const FieldActive = () => (
  <div
    className="border m-1 p-3 bg-primary text-white"
    style={{ width: "50px", height: "50px" }}
  >
    И
  </div>
);

const AlertSuccess = ({ children }) => (
  <div className="alert alert-success" role="alert">
    {children}
  </div>
);

const StartAgainBtn = (props) => (
  <button
    className="btn btn-secondary mt-4"
    type="button"
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

class MazeGame extends React.Component {
  static FieldStart = FieldStart;
  static FieldEnd = FieldEnd;
  static FieldOpened = FieldOpened;
  static FieldClosed = FieldClosed;
  static FieldActive = FieldActive;
  static AlertSuccess = AlertSuccess;
  static StartAgainBtn = StartAgainBtn;

  constructor(props) {
    super(props);
    this.state = {
      fieldActive: {
        row: this.props.startPosition.row,
        col: this.props.startPosition.col,
      },
    };
  }

  handleStartAgain = () => {
    this.setState({
      fieldActive: {
        row: this.props.startPosition.row,
        col: this.props.startPosition.col,
      },
    });
  };

  handleKeyDown = (e) => {
    const { row, col } = this.state.fieldActive;
    const maze = this.props.maze;

    switch (e.key) {
      case "ArrowLeft":
        if (col > 0 && maze[row][col - 1] !== 1) {
          this.setState({ fieldActive: { row, col: col - 1 } });
        }
        break;
      case "ArrowRight":
        if (col < maze[0].length - 1 && maze[row][col + 1] !== 1) {
          this.setState({ fieldActive: { row, col: col + 1 } });
        }
        break;
      case "ArrowUp":
        if (row > 0 && maze[row - 1][col] !== 1) {
          this.setState({ fieldActive: { row: row - 1, col } });
        }
        break;
      case "ArrowDown":
        if (row < maze.length - 1 && maze[row + 1][col] !== 1) {
          this.setState({ fieldActive: { row: row + 1, col } });
        }
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return (
      <div className="container text-center mt-5">
        <h1 className="display-4">Игра Лабиринт</h1>
        <div className="mb-4">
          <strong className="text-info">
            Используйте стрелки для передвижения
          </strong>
        </div>
        <div className="maze mb-3">
          {this.props.maze.map((itemRow, indexRow) => (
            <div className="d-flex justify-content-center" key={indexRow}>
              {itemRow.map((itemField, indexCol) => {
                if (
                  indexRow === this.props.startPosition.row &&
                  indexCol === this.props.startPosition.col
                ) {
                  return (
                    <MazeGame.FieldStart key={`${indexRow}-${indexCol}`} />
                  );
                } else if (
                  indexRow === this.props.endPosition.row &&
                  indexCol === this.props.endPosition.col
                ) {
                  return <MazeGame.FieldEnd key={`${indexRow}-${indexCol}`} />;
                } else if (
                  indexRow === this.state.fieldActive.row &&
                  indexCol === this.state.fieldActive.col
                ) {
                  return (
                    <MazeGame.FieldActive key={`${indexRow}-${indexCol}`} />
                  );
                } else if (itemField === 0) {
                  return (
                    <MazeGame.FieldOpened key={`${indexRow}-${indexCol}`} />
                  );
                } else if (itemField === 1) {
                  return (
                    <MazeGame.FieldClosed key={`${indexRow}-${indexCol}`} />
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
        {this.state.fieldActive.row === this.props.endPosition.row &&
          this.state.fieldActive.col === this.props.endPosition.col && (
            <MazeGame.AlertSuccess>
              🎉 Поздравляем! Вы прошли лабиринт!
            </MazeGame.AlertSuccess>
          )}
        <MazeGame.StartAgainBtn onClick={this.handleStartAgain}>
          Начать заново
        </MazeGame.StartAgainBtn>
      </div>
    );
  }
}
export default MazeGame;
