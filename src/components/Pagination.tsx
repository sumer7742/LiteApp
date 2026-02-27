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
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "600",
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#4f46e5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeSize: {
    backgroundColor: "#4f46e5",
  },
  sizeText: {
    color: "#4f46e5",
    fontWeight: "500",
  },
  activeSizeText: {
    color: "#fff",
  },
});