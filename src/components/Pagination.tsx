import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface PaginationProps {
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  onPageChange: (pageNumber: number, pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  pageNumber,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleNext = () => {
    if (pageNumber < totalPages) {
      onPageChange(pageNumber + 1, pageSize);
    }
  };

  const handlePrev = () => {
    if (pageNumber > 1) {
      onPageChange(pageNumber - 1, pageSize);
    }
  };

  const changePageSize = (size: number) => {
    onPageChange(1, size); // reset to page 1
  };

  return (
    <View style={styles.container}>
      {/* Prev / Page Info / Next */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, pageNumber === 1 && styles.disabled]}
          disabled={pageNumber === 1}
          onPress={handlePrev}
        >
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          {pageNumber} / {totalPages || 1}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            pageNumber === totalPages && styles.disabled,
          ]}
          disabled={pageNumber === totalPages || totalPages === 0}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Page Size Selector */}
      <View style={styles.sizeContainer}>
        {[5, 10, 20].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              pageSize === size && styles.activeSize,
            ]}
            onPress={() => changePageSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                pageSize === size && styles.activeSizeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#1f2937",
    borderTopWidth: 1,
    borderColor: "#374151",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",  
    alignItems: "center",
  },

  button: {
    backgroundColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 70,                      
    alignItems: "center",
  },

  disabled: {
    backgroundColor: "#374151",
    opacity: 0.5,
  },

  buttonText: {
    color: "#d1d5db",
    fontWeight: "600",
    fontSize: 14,
  },

  pageText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e5e7eb",
    letterSpacing: 0.5,              
  },

  sizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  sizeButton: {
    borderWidth: 1,
    borderColor: "#4b5563",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    marginHorizontal: 5,
    minWidth: 40,                     
    alignItems: "center",
  },

  activeSize: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },

  sizeText: {
    color: "#d1d5db",
    fontWeight: "600",
    fontSize: 13,
  },

  activeSizeText: {
    color: "#fff",
  },
});