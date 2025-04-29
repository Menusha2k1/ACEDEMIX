import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  FaPlus,
  FaTrash,
  FaFilePdf,
  FaSave,
  FaUndo,
  FaRedo,
  FaShapes,
  FaStickyNote,
  FaTable,
  FaPen,
  FaColumns,
} from "react-icons/fa";
import jsPDF from "jspdf";

const initialNodes = [
  {
    id: "1",
    data: { label: "Central Topic" },
    position: { x: 400, y: 300 },
    type: "input",
  },
];

const initialEdges = [];

const MapEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(2);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const addNode = useCallback(() => {
    const newNode = {
      id: nodeId.toString(),
      data: { label: `New Node ${nodeId}` },
      position: {
        x: Math.random() * 800 + 100,
        y: Math.random() * 500 + 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId(nodeId + 1);
  }, [setNodes, nodeId]);

  const removeNodes = useCallback(() => {
    setNodes([initialNodes[0]]);
    setEdges([]);
    setNodeId(2);
  }, [setNodes, setEdges]);

  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Mind Map Export", 10, 10);
    nodes.forEach((node, index) => {
      pdf.text(`${node.data.label}`, 10, 20 + index * 10);
    });
    pdf.save("mindmap.pdf");
  };

  const saveDiagram = () => {
    const diagramData = JSON.stringify({ nodes, edges });
    localStorage.setItem("mindmap", diagramData);
    alert("Mind map saved!");
  };

  const undo = () => {
    if (history.length > 0) {
      setFuture([nodes, ...future]);
      setNodes(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  const redo = () => {
    if (future.length > 0) {
      setHistory([...history, nodes]);
      setNodes(future[0]);
      setFuture(future.slice(1));
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-16 bg-gray-200 flex flex-col items-center p-2 shadow-md">
        <button onClick={addNode} className="p-2 m-2 bg-blue-500 text-white rounded">
          <FaPlus />
        </button>
        <button onClick={removeNodes} className="p-2 m-2 bg-red-500 text-white rounded">
          <FaTrash />
        </button>
        <button onClick={exportToPDF} className="p-2 m-2 bg-green-500 text-white rounded">
          <FaFilePdf />
        </button>
        <button onClick={saveDiagram} className="p-2 m-2 bg-purple-500 text-white rounded">
          <FaSave />
        </button>
        <button onClick={undo} className="p-2 m-2 bg-yellow-500 text-white rounded">
          <FaUndo />
        </button>
        <button onClick={redo} className="p-2 m-2 bg-yellow-500 text-white rounded">
          <FaRedo />
        </button>
        <button className="p-2 m-2 bg-gray-500 text-white rounded">
          <FaShapes />
        </button>
        <button className="p-2 m-2 bg-gray-500 text-white rounded">
          <FaStickyNote />
        </button>
        <button className="p-2 m-2 bg-gray-500 text-white rounded">
          <FaTable />
        </button>
        <button className="p-2 m-2 bg-gray-500 text-white rounded">
          <FaPen />
        </button>
        <button className="p-2 m-2 bg-gray-500 text-white rounded">
          <FaColumns />
        </button>
      </div>
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={(connection) => setEdges((eds) => addEdge(connection, eds))}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default MapEditor;
