#include "zoom_v8_to_c.h"
#if (defined _WIN32)
void utf8to16(const char* src, ZNODESTRING& buffer)
{
	buffer.resize(MultiByteToWideChar(CP_UTF8, 0, src, -1, 0, 0));
	MultiByteToWideChar(CP_UTF8, 0, src, -1, &buffer[0], buffer.size());
}

void convertV8String2Wstring(v8::Local<v8::String> str, ZNODESTRING& output)
{
	std::string utf8;
#ifdef USING_V8_NEW_STRING
	auto isolate = v8::Isolate::GetCurrent();
	if (str->Utf8Length(isolate) == 0)
		return;
	utf8.resize(str->Utf8Length(isolate) + 1);
	str->WriteUtf8(isolate, const_cast<char*>(utf8.c_str()), str->Utf8Length(isolate));
#else
	if (str->Utf8Length() == 0)
		return;
	utf8.resize(str->Utf8Length() + 1);
	str->WriteUtf8(const_cast<char*>(utf8.c_str()), str->Utf8Length());
#endif 

	utf8to16(utf8.c_str(), output);
}
#else
#endif
void zoom_v8toc(v8::Local<v8::String> v8string, ZNODESTRING& c_string) {
#if (defined _WIN32)
	convertV8String2Wstring(v8string, c_string);
#else
#ifdef USING_V8_NEW_STRING
	auto isolate = v8::Isolate::GetCurrent();
	c_string.resize(v8string->Utf8Length(isolate) + 1);
	v8string->WriteUtf8(isolate, const_cast<char*>(c_string.c_str()), v8string->Utf8Length(isolate));
#else
	c_string.resize(v8string->Utf8Length() + 1);
	v8string->WriteUtf8(const_cast<char*>(c_string.c_str()), v8string->Utf8Length());
#endif
#endif
}

void zoom_v8toc(v8::Local<v8::Boolean> v8boolean, bool& c_bool) {
	auto isolate = v8::Isolate::GetCurrent();

#if (defined _WIN32)
#ifdef USING_V8_NEW_STRING
	c_bool = v8boolean->BooleanValue(isolate) ? true : false;
#else
	c_bool = v8boolean->BooleanValue() ? true : false;
#endif //USING_V8_NEW_STRING
#else
#ifdef USING_V8_NEW_STRING
	c_bool = v8boolean->BooleanValue(isolate) ? 1 : 0;
#else
	c_bool = v8boolean->BooleanValue() ? 1 : 0;
#endif //USING_V8_NEW_STRING
#endif //_WIN32
}
std::string zs2s(const ZNODESTRING& s)
{
#if (defined _WIN32)
	int len;
	int slength = (int)s.length() + 1;
	len = WideCharToMultiByte(CP_UTF8, 0, s.c_str(), slength, 0, 0, 0, 0);
	std::string r(len, '\0');
	WideCharToMultiByte(CP_UTF8, 0, s.c_str(), slength, &r[0], len, 0, 0);
	return r;
#else
	return s;
#endif

}
ZNODESTRING s2zs(const std::string& s)
{
#if (defined _WIN32)
	const char* chSrc_test = s.c_str();
	ZNODESTRING buffer;
	if (s.empty())
	{
		return buffer;
	}
	buffer.resize(MultiByteToWideChar(CP_UTF8, 0, chSrc_test, -1, 0, 0));
	MultiByteToWideChar(CP_UTF8, 0, chSrc_test, -1, &buffer[0], buffer.size());
	return buffer;
#else
	return s;
#endif
}
void convertBool(bool o_bool, bool& n_bool) {
#if (defined _WIN32)
	n_bool = o_bool ? true : false;
#else
	n_bool = o_bool ? 1 : 0;
#endif
}
