require "test_helper"

class ItemsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get items_show_url
    assert_response :success
  end

  test "should get create" do
    get items_create_url
    assert_response :success
  end
end
