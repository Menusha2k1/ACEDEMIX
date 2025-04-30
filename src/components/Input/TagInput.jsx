import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
          {tags.map((tag, index) => (
            <span 
              key={index} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "4px", 
                fontSize: "14px", 
                color: "#1f2937", 
                backgroundColor: "#f3f4f6", 
                padding: "4px 12px", 
                borderRadius: "4px"
              }}
            >
              # {tag}
              <button 
                onClick={() => handleRemoveTag(tag)}
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
        <input
          type="text"
          value={inputValue}
          style={{ 
            fontSize: "14px", 
            backgroundColor: "transparent", 
            border: "1px solid #ccc", 
            padding: "8px", 
            borderRadius: "4px", 
            outline: "none" 
          }}
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          style={{ 
            width: "32px", 
            height: "32px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            borderRadius: "4px", 
            border: "1px solid #2563eb", 
            backgroundColor: "transparent", 
            cursor: "pointer", 
            transition: "background 0.2s ease" 
          }}
          onClick={addNewTag}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <MdAdd style={{ fontSize: "20px", color: "#2563eb" }} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;