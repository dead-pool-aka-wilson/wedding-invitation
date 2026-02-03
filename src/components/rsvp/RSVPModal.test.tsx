/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RSVPModal } from "./RSVPModal";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "참석 의사 전달",
      name: "성함",
      phone: "연락처",
      side: "신랑측/신부측",
      groomSide: "신랑측",
      brideSide: "신부측",
      attendance: "참석하실 수 있으신가요?",
      yes: "네, 참석합니다",
      no: "아니요, 참석이 어렵습니다",
      headcount: "몇 분이서 오시나요?",
      busTo: "서울→대구 버스 이용하시겠어요?",
      busFrom: "돌아오는 버스는요?",
      sameDay: "당일",
      nextMorning: "다음날 아침",
      self: "직접 이동",
      submit: "제출하기",
      success: "감사합니다!",
    };
    return translations[key] || key;
  },
}));

vi.mock("@/components/ui", () => ({
  GlassCard: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="glass-card">{children}</div>
  ),
}));

vi.mock("@/lib/rsvp/api", () => ({
  submitRSVP: vi.fn().mockResolvedValue({ success: true }),
}));

describe("RSVPModal", () => {
  const mockOnClose = vi.fn();
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders nothing when closed", () => {
    render(<RSVPModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByTestId("rsvp-modal")).not.toBeInTheDocument();
  });

  test("renders modal when open", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByTestId("rsvp-modal")).toBeInTheDocument();
  });

  test("renders contact step initially", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByLabelText("성함")).toBeInTheDocument();
    expect(screen.getByLabelText("연락처")).toBeInTheDocument();
    expect(screen.getByText("신랑측")).toBeInTheDocument();
    expect(screen.getByText("신부측")).toBeInTheDocument();
  });

  test("closes modal when backdrop is clicked", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("closes modal when X button is clicked", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByLabelText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("advances to attendance step after filling contact info", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText("성함"), { target: { value: "홍길동" } });
    fireEvent.change(screen.getByLabelText("연락처"), { target: { value: "010-1234-5678" } });
    fireEvent.click(screen.getByText("신랑측"));
    fireEvent.click(screen.getByText("→"));

    expect(screen.getByText("참석하실 수 있으신가요?")).toBeInTheDocument();
  });

  test("shows headcount step after selecting yes for attendance", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText("성함"), { target: { value: "홍길동" } });
    fireEvent.change(screen.getByLabelText("연락처"), { target: { value: "010-1234-5678" } });
    fireEvent.click(screen.getByText("신랑측"));
    fireEvent.click(screen.getByText("→"));

    fireEvent.click(screen.getByText(/네, 참석합니다/));
    fireEvent.click(screen.getByText("→"));

    expect(screen.getByText("몇 분이서 오시나요?")).toBeInTheDocument();
  });

  test("renders progress bar", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);
    const progressBars = screen.getAllByRole("generic").filter(
      (el) => el.className.includes("rounded-full") && el.className.includes("h-1")
    );
    expect(progressBars.length).toBeGreaterThan(0);
  });

  test("can go back to previous step", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText("성함"), { target: { value: "홍길동" } });
    fireEvent.change(screen.getByLabelText("연락처"), { target: { value: "010-1234-5678" } });
    fireEvent.click(screen.getByText("신랑측"));
    fireEvent.click(screen.getByText("→"));

    expect(screen.getByText("참석하실 수 있으신가요?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("←"));

    expect(screen.getByLabelText("성함")).toBeInTheDocument();
  });

  test("shows complete screen after full flow", async () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} onComplete={mockOnComplete} />);

    fireEvent.change(screen.getByLabelText("성함"), { target: { value: "홍길동" } });
    fireEvent.change(screen.getByLabelText("연락처"), { target: { value: "010-1234-5678" } });
    fireEvent.click(screen.getByText("신랑측"));
    fireEvent.click(screen.getByText("→"));

    fireEvent.click(screen.getByText(/네, 참석합니다/));
    fireEvent.click(screen.getByText("→"));

    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("→"));

    fireEvent.click(screen.getByText(/직접 이동/));
    fireEvent.click(screen.getByText("→"));

    fireEvent.click(screen.getAllByText(/직접 이동/)[0]);
    fireEvent.click(screen.getByText("제출하기"));

    await waitFor(() => {
      expect(screen.getByText("감사합니다!")).toBeInTheDocument();
    });
  });

  test("locks body scroll when open", () => {
    render(<RSVPModal isOpen={true} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("unlocks body scroll when closed", () => {
    const { rerender } = render(<RSVPModal isOpen={true} onClose={mockOnClose} />);
    rerender(<RSVPModal isOpen={false} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe("");
  });
});
