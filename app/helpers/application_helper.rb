module ApplicationHelper

  def nav_link(link_text, link_path)
    class_name = request.path =~ /#{link_path.to_s.downcase}/ ? 'active' : ''
    tag_name = request.path =~ /#{link_path.to_s.downcase}/ ? 'span' : 'li'

    content_tag(tag_name.to_sym, :class => class_name) do
      if tag_name == 'span'
        link_text
      else
        link_to link_text, link_path
      end
    end
  end

end
